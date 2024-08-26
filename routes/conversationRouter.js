import { Router } from "express";

import conversationController from "../controllers/conversationController.js";

const conversationRoute = Router();

conversationRoute.post("/", conversationController.addConversation);

conversationRoute.get("/:userId", conversationController.getUserConversation);

conversationRoute.get(
  "/find/:firstUserId/:secondUserId",
  conversationController.getUserConversation
);

export default conversationRoute;
