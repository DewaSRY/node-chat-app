//
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");
const { Socket } = require("socket.io");

const userAuthRouter = require("./controller/user");

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

const io = require("socket.io")(server);

const messageMap = [];

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(
  cookieSession({
    keys: ["lkasld235j"],
  })
);
app.use(cors());
app.use(userAuthRouter);

let socketConnection = new Set();
io.on("connection", onConnection);
/**
 *
 * @param {Socket} socket
 */
function onConnection(socket) {
  io.emit("get-connection", socket.id);
  console.log(socket.id);
  socketConnection.add(socket.id);

  io.emit("client-total", socketConnection.size);
  io.emit("all-message", messageMap);

  socket.on("disconnect", () => {
    console.log("socket diconected socet id", socket.id);
    socketConnection.delete(socket.id);

    io.emit("client-total", socketConnection.size);
  });
  //   console.log(socketConnection.size);

  /**
   * handling message event
   */

  socket.on("message", (data) => {
    const newData = {
      ...data,
      senderId: socket.id,
    };
    messageMap.push(newData);
    io.emit("all-message", messageMap);
  });
}
