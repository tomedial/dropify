import { useCallback, useEffect, useRef } from "react";
import io from "socket.io-client";
import { notifySuccess } from "../helper/helper";

const useSocket = (url, onMessage, onError) => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(url, {
      transports: ["websocket"]
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to server with id:", socketRef.current.id);
    });

    socketRef.current.on("message", onMessage);

    socketRef.current.on("messageSuccess", () => {
      notifySuccess("Message sent successfully");
    });

    socketRef.current.on("error", onError);

    socketRef.current.on("disconnect", (reason) => {
      console.log("Disconnected from server due to: ", reason);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [url, onMessage, onError]);

  const emitMessageToSocket = useCallback((message, arrayBuffer) => {
    if (socketRef.current) {
      socketRef.current.emit("message", message, arrayBuffer);
    }
  }, []);

  return { emitMessageToSocket };
};

export default useSocket;
