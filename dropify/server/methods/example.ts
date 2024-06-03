import WebSocket from "ws";
import { connectionService } from "../service";
import { Connection } from "../entity/connection";
import { Socket } from "socket.io";

export default (
  socket: Socket,
  message: string
): void => {
  connectionService
    .getConnectionByClientId(socket)
    .then((connection: Connection | null): void => {
      socket.send(
        JSON.stringify({
          hello: "world",
          received: message,
          clientId: connection?.clientId,
        })
      );
    })
    .catch((error: any): void => {
      console.error("Error getting connection:", error);
    });
};
