import { Conversation } from "../models/Conversation.js";

export const addConversation = (data) => Conversation.create(data);

export const getUser = (filter) => Conversation.find(filter);

export const getUserByIdSend = (filter) => Conversation.find(filter);
