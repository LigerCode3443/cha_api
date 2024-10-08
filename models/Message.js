import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Message = model("Message", MessageSchema);
export default Message;
