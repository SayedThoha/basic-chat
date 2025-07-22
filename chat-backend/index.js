const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
var cors = require("cors");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (data) => {
    console.log("join", data);
  });

  socket.on("chat", (data) => {
    console.log("chat", data);

    io.emit("chat-received", data);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
