import express, { Application } from "express";
import cors from "cors";
import messageRoutes from "./routes/messageRoutes";

const app: Application = express();

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());

app.use('/', messageRoutes);

export default app;