import { Server, ServerOptions } from "socket.io";
import http from "http";
import dotenv from "dotenv";

let io: Server;

export function getIo() {
  return io;
}

export function startWSServer(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const nodeEnv: string | undefined = process.env.NODE_ENV;
    dotenv.config({ path: `.env.${nodeEnv}` });

    const options: Partial<ServerOptions> = {
      cors: {
        origin: "http://localhost:3000",
      },
      transports: ["websocket"],
      maxHttpBufferSize: 5 * 1024 * 1024,
    };

    io = new Server(options);

    const httpServer: http.Server = http.createServer();

    try {
      io.attach(httpServer);
    } catch (error) {
      console.error("Failed to attach socket.io server:", error);
      reject(error);
    }

    const port: number = Number(process.env.PORT) || 4000;
    httpServer
      .listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        resolve();
      })
      .on("error", (error) => {
        console.error("Failed to start server:", error);
        reject(error);
      });
  });
}
