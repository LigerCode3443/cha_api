import * as conversationServices from "../services/conversationServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const addConversation = async (req, res) => {
  console.log(req.body);
  const savedConversation = await conversationServices.addConversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  res.status(200).json(savedConversation);
};

const getUserConversation = async (req, res) => {
  const conversation = await conversationServices.getUser({
    members: { $in: [req.params.userId] },
  });
  res.status(200).json(conversation);
};

const getConversationById = async (req, res) => {
  const conversation = await conversationServices.getUserByIdSend({
    members: { $all: [req.params.firstUserId, req.params.secondUserId] },
  });
  res.status(200).json(conversation);
};

export default {
  addConversation: ctrlWrapper(addConversation),
  getUserConversation: ctrlWrapper(getUserConversation),
  getConversationById: ctrlWrapper(getConversationById),
};
