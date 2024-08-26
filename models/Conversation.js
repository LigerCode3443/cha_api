import { Schema, model } from "mongoose";

const ConversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Conversation = model("Conversation", ConversationSchema);
