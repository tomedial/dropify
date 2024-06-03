import { Connection } from "../entity/connection";
import { faker } from "@faker-js/faker";
import { formatIpAddress } from "../helpers";
import { datasource } from "../database/database";
import { Socket } from "socket.io";

export async function saveNewConnection(socket: Socket): Promise<Connection> {
  const newConnection = new Connection();
  newConnection.clientId = socket.id;
  newConnection.name = faker.person.fullName();
  newConnection.avatar = faker.image.urlLoremFlickr({ category: "abstract" });
  newConnection.ipAdress = formatIpAddress(socket.handshake.address);
  newConnection.createdAt = new Date();
  return await datasource.getRepository(Connection).save(newConnection);
}

export async function deleteOldConnection(clientId: string): Promise<void> {
  await datasource.getRepository(Connection).delete({ clientId: clientId });
};

export async function getConnectionByClientId(
  socket: Socket
): Promise<Connection | null> {
  try {
    const connection = await datasource.getRepository(Connection).findOne({
      where: { clientId: socket.id },
    });
    return connection;
  } catch (error) {
    console.error("Error creating connection:", error);
    throw error;
  }
}

export async function getConnectionsFromSameNetwork(ip: string): Promise<Connection[]> {
  try {
    const clientConnection = await datasource.getRepository(Connection).findOne({
      where: { ipAdress: ip },
    });
    if (!clientConnection) {
      return [];
    }
    const networkPrefix = clientConnection.ipAdress.substring(0, clientConnection.ipAdress.lastIndexOf("."));
    const connections = await datasource.getRepository(Connection).find();
    return connections.filter((connection) =>
      connection.ipAdress.startsWith(networkPrefix)
    );
  } catch (error) {
    console.error("Error getting connections:", error);
    throw error;
  }
}
