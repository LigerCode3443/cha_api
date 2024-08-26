import { Router } from "express";

import messageController from "../controllers/messageController.js";
import authenticate from "../middlewares/authenticate.js";

const messageRouter = Router();

messageRouter.use(authenticate);

messageRouter.post("/", messageController.addMessage);

messageRouter.get("/:conversationId", messageController.getAll);

export default messageRouter;
