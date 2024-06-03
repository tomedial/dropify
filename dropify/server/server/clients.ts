import { Connection } from "../entity/connection";
import { WebSocketEvents } from "../enum/WebSocketEvents";
import { getIo } from "./server";

export const notifyClients = (connections: Connection[]) => {
  let io = getIo();
  for (const connection of connections) {
    const socket = io.sockets.sockets.get(connection.clientId);
    if (socket) {
      socket.send(
        JSON.stringify({
          type: WebSocketEvents.Update,
          clients: connections.map((connection) => connection),
        })
      );
    }
  }
};
