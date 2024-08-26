import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import authRouter from "./routes/authRouter.js";
import messageRouter from "./routes/messageRouter.js";
import conversationRoute from "./routes/conversationRouter.js";
// r8P1UH65KXUIYbF2;
// o9hC8JkqQvgOtrwa;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/conversations", conversationRoute);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
