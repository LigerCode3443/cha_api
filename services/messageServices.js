import Message from "../models/Message.js";

export const allMessage = (filter) => Message.find(filter);

export const addMessage = (data) => Message.create(data);
