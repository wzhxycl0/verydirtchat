import { IMessage } from "../types/IMessage.ts";
import { create } from "zustand/react";
import { $api } from "../api.ts";

interface IMessageStore {
    messages: IMessage[];
    addMessage: (message: IMessage) => void;
    setMessages: (messages: IMessage[]) => void;
}

export const useMessageStore = create<IMessageStore>((set) => {
    $api.get<IMessage[]>("get_messages").then(({ data }) => set({ messages: data }));

    return {
        messages: [],
        addMessage: (message) => set((state) => ({
            messages: [...state.messages, message],
        })),
        setMessages: (messages) => set({ messages }),
    };
});