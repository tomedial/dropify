import { getIo } from "../server/server";
import {
  handleClientConnect,
  handleClientDisconnect,
  handleClientError,
} from "./connectionHandler";
import { WebSocketEvents } from "../enum/WebSocketEvents";
import WebSocket from "ws";
import { handleClientMessage } from "./messageHandler";
import { Socket } from "socket.io";

export function handleWebSocketEvents() {
  const io = getIo();

  io.on(WebSocketEvents.Connection, (socket: Socket) => {
    handleClientConnect(socket);

    socket.on(
      WebSocketEvents.Message,
      (message: WebSocket.Data, arrayBuffer: ArrayBuffer) => {
        handleClientMessage(socket, message, arrayBuffer);
      }
    );

    socket.on(WebSocketEvents.Disconnect, () => {
      handleClientDisconnect(socket);
    });
  });
}