import Chat from "../Chat/Chat.tsx";
import Auth from "../Auth/Auth.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import { useAuthStore } from "../../stores/auth-store.ts";

export default function App() {
    const isLogin = useAuthStore().login;

    return (
        <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={isLogin ? <Chat /> : <Auth />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}