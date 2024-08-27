import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import authRouter from "./routes/authRouter.js";
import messageRouter from "./routes/messageRouter.js";
import conversationRoute from "./routes/conversationRouter.js";
import { Server } from "socket.io";
import { createServer } from "http";
// r8P1UH65KXUIYbF2;
// o9hC8JkqQvgOtrwa;

const app = express();
const server = createServer(app); // Створюємо HTTP сервер
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // socket.on("sendMessage", ({ senderId, receiverId, text }) => {
  //   const user = getUser(receiverId);
  //   io.to(user.socketId).emit("getMessage", {
  //     senderId,
  //     text,
  //   });
  // });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

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
    server.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
