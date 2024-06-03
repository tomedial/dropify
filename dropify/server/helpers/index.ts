import { AddressInfo } from "ws";
import { WSSError } from "../types/error";
import { Socket } from "socket.io";
/**
 * @param {string | number} PORT The port to listen on.
 * @return {number} The normalized port number.
 */
export function normalizePort(PORT: string | number): number {
  if (isNaN(Number(PORT))) PORT = 8080;

  return PORT as number;
}

/**
 * 
 * @param {string} ip The ip address to format.
 * @returns {string} The formatted ip address.
 */

export function formatIpAddress (ip: string): string {
  if (!ip) return '';
  if(ip === "::1"){
    return "127.0.0.1"
  }
  return ip.startsWith('::ffff:') ? ip.slice(7) : ip;
}

/**
 * Returns the address port as a string.
 * @param address - The address to get the port from.
 * @returns The address port as a string.
 */
export function getAddressPort(address: string | AddressInfo): string {
  if (typeof address === "string") {
    return address;
  } else {
    return address.port.toString();
  }
}

/**
 * Safely parses a JSON string.
 * @param message - The JSON string to parse.
 * @returns The parsed JSON object, or null if the JSON is invalid.
 */
export function safeParseJSON(message: string): any {
  try {
    return JSON.parse(message);
  } catch (error) {
    return null;
  }
}

/**
 * @param {WSSError}
 * @return The rendered error message
 */
export function generateWSSError({ error, reasons = [] }: WSSError) {
  return {
    type: 'error',
    message: error,
    code: error
      .split(' ')
      .join('_')
      .toLowerCase(),
    context_info: {
      errors: reasons.map(({ reason, message, data, location }) => {
        return {
          reason,
          message,
          data: data || null,
          location
        }
      })
    }
  }
}

/**
 * Sends a message to a socket, safely handling any errors that may occur.
 * @param socket - The socket to send the message to.
 * @param message - The message to send.
 */
export function safeSend(socket: Socket, message: any) {
  try {
    socket.send(JSON.stringify(message));
  } catch (error) {
    console.error("Error sending message to client:", error);
  }
}

export default {
  normalizePort,
  safeParseJSON,
  generateWSSError
};
