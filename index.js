require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const messageRoutes = require("./routes/messageRoute");
const socket = require("socket.io");
const app = express();

app.use(cors());
app.use(express.json());

const server = app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));

connectDB();

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});
