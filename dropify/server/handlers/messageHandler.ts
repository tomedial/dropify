import { Socket } from "socket.io";
import { MethodNotFoundError, ParsingError } from "../errors/errors";
import { generateWSSError, safeParseJSON } from "../helpers";
import { Methods } from "../methods";

export async function handleClientMessage(socket: Socket, message: any, arrayBuffer: ArrayBuffer) {
  const messageData = safeParseJSON(message.toString());

  if (messageData === null) {
    socket.send(
      JSON.stringify(generateWSSError(ParsingError))
    );
  } else if (
    typeof messageData.type === "string" &&
    messageData.type in Methods
  ) {
    const typeKey = messageData.type as keyof typeof Methods;
    Methods[typeKey](socket, messageData, arrayBuffer);
  } else {
    socket.send(
      JSON.stringify(generateWSSError(MethodNotFoundError))
    );
  }
}
