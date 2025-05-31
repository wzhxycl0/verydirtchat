import { createServer } from "node:http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import { chatSocket } from "./sockets/chatSocket";
import { PORT } from "../config.json";

const server = createServer(app);
const io: SocketIOServer = new SocketIOServer(server, {
    cors: { origin: true }
});

chatSocket(io);

server.listen(PORT);