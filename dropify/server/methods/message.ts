import { getIo } from "../server/server";
import { getConnectionByClientId } from "../service/connectionService";
import { Socket } from "socket.io";

export default async (socket: Socket, message: any, arrayBuffer: ArrayBuffer): Promise<void> => {
  const targetClientId = message.targetClientId;

  const sendingClient = await getConnectionByClientId(socket);
  if (!sendingClient) {
    return sendError(socket, 'Sending client not found');
  }

  const targetClient = getIo().sockets.sockets.get(targetClientId);
  if (!targetClient || !targetClient.connected) {
    return sendError(socket, 'Target client not found or not connected');
  }

  const options = { timeZone: 'Europe/Berlin' };
  const timestamp = new Date().toLocaleString('en-US', options);
  
  sendMessage(targetClient, {
    from: sendingClient,
    type: 'message',
    message: message,
    timestamp: timestamp
  }, arrayBuffer);

  sendSuccess(socket, 'Message sent successfully');
};

function sendError(socket: Socket, message: string) {
  socket.emit('error', { type: 'status', status: 'error', message });
}

function sendSuccess(socket: Socket, message: string) {
  socket.emit('messageSuccess', { type: 'status', status: 'success', message });
}

function sendMessage(socket: Socket, message: any, arrayBuffer:ArrayBuffer) {
  socket.send(JSON.stringify(message), arrayBuffer);
}