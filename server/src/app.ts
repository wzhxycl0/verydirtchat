import express, { Application, Response, Request } from "express";
import cors from "cors";
import messageRoutes from "./routes/messageRoutes";
import * as path from "node:path";

const app: Application = express();

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')))

app.use('/', messageRoutes);
app.get('/', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

export default app;