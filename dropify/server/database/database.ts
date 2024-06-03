import { DataSource } from "typeorm";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const connectionOptions: SqliteConnectionOptions = {
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: ["entity/**/*.ts"],
  dropSchema: true,
};

export const datasource = new DataSource(connectionOptions);

export const connectToDatabase = async () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (!datasource.isInitialized) {
        await datasource.initialize();
        console.log("Database connection established");
      } else {
        console.log("Database connection already established");
      }
      resolve();
    } catch (error) {
      console.error("Failed to connect to the database:", error);
      reject(error);
    }
  });
};
