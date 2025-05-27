import { Box } from "@mui/material";
import ChatInput from "../ChatInput/ChatInput.tsx";
import ChatBox from "../ChatBox/ChatBox.tsx";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useMessageStore } from "../../stores/message-store.ts";
import { useAuthStore } from "../../stores/auth-store.ts";

export default function Chat() {
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<Socket | null>(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [newMessages, setNewMessages] = useState(0);
    const [blockInput, setBlockInput] = useState(false);

    const isAtBottomRef = useRef(isAtBottom);

    useEffect(() => {
        isAtBottomRef.current = isAtBottom;
        if (isAtBottom) setNewMessages(0);
    }, [isAtBottom]);

    useEffect(() => {
        socketRef.current = io("localhost:1488");

        socketRef.current.on("connect", () =>
            useAuthStore.getState().setId(socketRef.current?.id)
        );

        socketRef.current.on("message", (data) => {
            if (useAuthStore.getState().id === data.senderId) setBlockInput(false);
            useMessageStore.getState().addMessage({
                nickname: data.nickname,
                text: data.text,
                senderId: data.senderId,
            });
            if (!isAtBottomRef.current) setNewMessages((prev) => prev + 1);
        });
    }, []);

    return (
        <Box sx={{ height: "100%" }}>
            <Box sx={{ display: "flex", height: "100%", flexDirection: "column", justifyContent: "space-between" }}>
                <ChatBox
                    chatBoxRef={chatBoxRef}
                    isAtBottom={isAtBottom}
                    setIsAtBottom={setIsAtBottom}
                    newMessages={newMessages}
                />
                <ChatInput
                    chatBoxRef={chatBoxRef}
                    socketRef={socketRef}
                    blockInput={blockInput}
                    setBlockInput={setBlockInput}
                />
            </Box>
        </Box>
    );
}