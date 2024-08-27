import { Router } from "express";

import conversationController from "../controllers/conversationController.js";
import authenticate from "../middlewares/authenticate.js";

const conversationRoute = Router();

// conversationRoute.use(authenticate);

conversationRoute.post("/", conversationController.addConversation);

conversationRoute.get("/:userId", conversationController.getUserConversation);

conversationRoute.get(
  "/find/:firstUserId/:secondUserId",
  conversationController.getUserConversation
);

export default conversationRoute;
