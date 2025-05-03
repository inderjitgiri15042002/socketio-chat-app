const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.resolve("./public")));

// Serve HTML file
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("user-message", (message) => {
    io.emit("message", message); // broadcast to all users
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(9000, () => {
  console.log("Listening on http://localhost:9000");
});
