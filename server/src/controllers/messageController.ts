import { Request, Response } from "express";
import { Server as SocketIOServer } from "socket.io";
import { prisma } from "../db/prisma";
import { makeRudeMessage } from "../services/openaiService";

export interface ChatMessage {
    nickname: string;
    text: string;
    senderId?: string;
}

export async function getMessages(req: Request, res: Response): Promise<void> {
    const last_messages: Pick<ChatMessage, "nickname" | "text">[] = await prisma.message.findMany({
        select: { nickname: true, text: true },
        orderBy: { id: 'desc' },
        take: 100,
    });
    res.json(last_messages.reverse());
}

export async function handleMessage(
    data: ChatMessage,
    io: SocketIOServer
): Promise<void> {
    if (data.nickname && data.text && data.text.length < 100) {
        data.text = await makeRudeMessage(data.text);
        await prisma.message.create({
            data: {
                nickname: data.nickname,
                text: data.text
            }
        });
        io.emit("message", data);
    }
}