import { Server as SocketIOServer, Socket } from "socket.io";
import { handleMessage, ChatMessage } from "../controllers/messageController";

export function chatSocket(io: SocketIOServer): void {
    io.on("connection", (socket: Socket) => {
        socket.on("message", async (data: ChatMessage) => {
            await handleMessage(data, io);
        });
    });
}