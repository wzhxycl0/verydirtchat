import { create } from "zustand/react";

interface IAuthStore {
    nickname: string;
    login: boolean;
    id?: string;
    auth: (nickname: string) => void;
    setId: (id?: string) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
    nickname: "",
    login: false,
    id: "",
    auth: (nickname) => set({ nickname, login: true }),
    setId: (id) => set({ id }),
}));
