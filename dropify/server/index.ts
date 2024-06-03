import { connectToDatabase } from "./database/database"
import { handleWebSocketEvents } from "./handlers/wssHandler"
import { startWSServer } from "./server/server"

async function startServer() {
  try {
    await connectToDatabase()
    await startWSServer()
    handleWebSocketEvents()
  } catch (error) {
    console.error("Failed to connect to database", error)
  }
}

startServer()