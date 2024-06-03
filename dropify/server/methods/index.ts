import WebSocket from 'ws';
import example from './example';
import message from './message';
import { Socket } from 'socket.io';

type MethodsType = {
  [key: string]: (ws: Socket, data: any, arrayBuffer: ArrayBuffer) => void
}

export const Methods: MethodsType = {
  example,
  message
};