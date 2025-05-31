import { Box, useTheme } from "@mui/material";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useMessageStore } from "../../stores/message-store.ts";
import { useEffect, RefObject } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import * as React from "react";

interface ChatBoxProps {
    chatBoxRef: RefObject<HTMLDivElement | null>;
    isAtBottom: boolean;
    setIsAtBottom: React.Dispatch<React.SetStateAction<boolean>>;
    newMessages: number;
}

export default function ChatBox({
                                    chatBoxRef,
                                    isAtBottom,
                                    setIsAtBottom,
                                    newMessages,
                                }: ChatBoxProps) {
    const theme = useTheme();
    const messages = useMessageStore((state) => state.messages);

    useEffect(() => {
        if (isAtBottom) {
            chatBoxRef.current!.scrollTop = chatBoxRef.current!.scrollHeight;
        }
    }, [messages, isAtBottom, chatBoxRef]);

    const handleScroll = () => {
        const box = chatBoxRef.current;
        if (!box) return;
        setIsAtBottom(Math.abs(box.scrollHeight - (box.scrollTop + box.offsetHeight)) <= 10);
    };

    return (
        <Box
            ref={chatBoxRef}
            sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
            }}
            onScroll={handleScroll}
        >
            {messages.map((item, idx) => (
                <ChatMessage
                    nickname={item.nickname}
                    key={idx}
                    senderId={item.senderId}
                >
                    {item.text}
                </ChatMessage>
            ))}

            {!isAtBottom && (
                <Box
                    sx={{
                        position: "fixed",
                        right: 30,
                        bottom: 129,
                        width: 60,
                        height: 60,
                        borderRadius: "100px",
                        backgroundColor: theme.palette.primary.contrastText,
                        p: 2,
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 999,
                    }}
                    onClick={() => {
                        chatBoxRef.current!.scrollTop = chatBoxRef.current!.scrollHeight;
                    }}
                >
                    <ArrowDownwardIcon />
                    {newMessages > 0 && (
                        <span style={{ marginLeft: 8 }}>{newMessages}</span>
                    )}
                </Box>
            )}
        </Box>
    );
}