import { Box, Button, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { z as zov } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import SendIcon from "@mui/icons-material/Send";
import { useAuthStore } from "../../stores/auth-store.ts";
import { RefObject } from "react";
import { Socket } from "socket.io-client";
import * as React from "react";

const validationSchema = zov.object({
    message: zov.string().max(100).nonempty(),
});

interface ChatInputProps {
    chatBoxRef: RefObject<HTMLDivElement | null>;
    socketRef?: React.RefObject<Socket | null>;
    blockInput: boolean;
    setBlockInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatInput({
                                      chatBoxRef,
                                      socketRef,
                                      blockInput,
                                      setBlockInput,
                                  }: ChatInputProps) {
    return (
        <Box sx={{ alignSelf: "flex-end", display: "flex", width: "100%", p: 3 }}>
            <Formik
                initialValues={{ message: "" }}
                validationSchema={toFormikValidationSchema(validationSchema)}
                validateOnMount={true}
                validateOnChange={true}
                onSubmit={async ({ message }, { resetForm, validateForm }) => {
                    const { nickname, id } = useAuthStore.getState();
                    if (socketRef?.current)
                        socketRef.current.emit("message", { nickname, text: message, senderId: id });

                    resetForm();
                    await validateForm("");
                    chatBoxRef.current!.scrollTop = chatBoxRef.current!.scrollHeight;
                    setBlockInput(true);
                }}
            >
                {({ isValid }) => (
                    <Form style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                        <Field
                            as={TextField}
                            name="message"
                            sx={{ width: "100%" }}
                            autoComplete="off"
                            disabled={blockInput}
                        />
                        <Button
                            type="submit"
                            disabled={!isValid || blockInput}
                            variant="outlined"
                        >
                            <SendIcon />
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}