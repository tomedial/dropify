import { ErrorReasons } from "../enum/ErrorReasons";
import { WSSError } from "../types/error";

export const ParsingError: WSSError = {
  error: "Parsing Error",
  reasons: [
    {
      reason: ErrorReasons.InvalidMessageData,
      message: "Unable to parse the message contents",
      data: null, // This will be filled in later
      location: "websocket-message",
    },
  ],
};

export const MethodNotFoundError: WSSError = {
  error: "Method Not Found",
  reasons: [
    {
      reason: ErrorReasons.InvalidMethod,
      message: "Unable to find specified method",
      data: null, // This will be filled in later
      location: "method",
    },
  ],
};