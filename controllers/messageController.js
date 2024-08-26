import * as messageServices from "../services/messageServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAll = async (req, res) => {
  const conversationId = req.params.conversationId;
  console.log(conversationId);
  const message = await messageServices.allMessage({
    conversationId: conversationId,
  });

  res.status(200).json(message);
};

const addMessage = async (req, res) => {
  console.log(req.body);
  const savedMessage = await messageServices.addMessage(req.body);
  res.status(200).json(savedMessage);
};

export default {
  getAll: ctrlWrapper(getAll),
  addMessage: ctrlWrapper(addMessage),
};
