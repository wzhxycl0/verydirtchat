import { Paper, Typography } from "@mui/material";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/auth-store.ts";

interface ChatMessageProps {
    nickname: string;
    children: ReactNode;
    senderId: string | null;
}

export default function ChatMessage({ nickname, children, senderId }: ChatMessageProps) {
    const isSelf = senderId === useAuthStore.getState().id;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Paper
                sx={{
                    p: 2.5,
                    borderRadius: 2.5,
                    m: 0.5,
                    border: isSelf ? "1px solid green" : "none",
                }}
            >
                <Typography variant="subtitle2" sx={{ color: "rgb(97, 222, 42)" }}>
                    {nickname}
                </Typography>
                <Typography sx={{ wordBreak: "break-word" }}>{children}</Typography>
            </Paper>
        </motion.div>
    );
}