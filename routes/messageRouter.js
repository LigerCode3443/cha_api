import { Router } from "express";

import messageController from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.post("/", messageController.addMessage);

messageRouter.get("/:conversationId", messageController.getAll);

export default messageRouter;
