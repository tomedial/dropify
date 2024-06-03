import { notifyClients } from "../server/clients";
import { connectionService } from "../service";
import {
  deleteOldConnection,
  getConnectionByClientId,
} from "../service/connectionService";
import { Socket } from "socket.io";
import { safeSend } from "../helpers";
import { ErrorMessages } from "../enum/ErrorMessages";
import { WebSocketEvents } from "../enum/WebSocketEvents";

export async function handleClientConnect(socket: Socket) {
  const remoteAddress = socket.handshake.address;

  if (!remoteAddress) {
    socket.emit(WebSocketEvents.Error, ErrorMessages.NoRemoteAddress);
    socket.disconnect();
    return;
  }

  try {
    const newClientConnection = await connectionService.saveNewConnection(
      socket
    );
    const localNetworkConnections =
      await connectionService.getConnectionsFromSameNetwork(
        newClientConnection.ipAdress
      );

    safeSend(socket, {
      id: socket.id,
      avatar: newClientConnection.avatar,
      name: newClientConnection.name,
      type: WebSocketEvents.Connection,
      message: "Connection established",
    });

    notifyClients(localNetworkConnections);
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleClientError(socket, error);
    } else {
      console.error(ErrorMessages.UnknownError, error);
    }
  }
}

export async function handleClientDisconnect(socket: Socket) {
  try {
    const clientConnection = await getConnectionByClientId(socket);
    if (!clientConnection) return;

    await deleteOldConnection(socket.id);
    const connections = await connectionService.getConnectionsFromSameNetwork(
      clientConnection.ipAdress
    );

    notifyClients(connections);
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleClientError(socket, error);
    } else {
      console.error(ErrorMessages.UnknownError, error);
    }
  }
}

export function handleClientError(socket: Socket, error: Error) {
  console.error(`Error occurred with socket ${socket.id}:`, error);
  socket.emit(WebSocketEvents.Error, ErrorMessages.ConnectionError);
}
