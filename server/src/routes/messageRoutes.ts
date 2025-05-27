import express, { Router } from "express";
import { getMessages } from "../controllers/messageController";

const router: Router = express.Router();
router.get('/get_messages', getMessages);
export default router;
