import { Schema, model } from "mongoose";
import { handelSaveError, setUpdateOptions } from "./hooks.js";
import { emailRegex } from "../constants/user-constants.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handelSaveError);

userSchema.pre("findOneAndUpdate", setUpdateOptions);

userSchema.post("findOneAndUpdate", handelSaveError);

const User = model("user", userSchema);

export default User;
