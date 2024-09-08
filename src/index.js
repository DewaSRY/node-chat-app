//
const express = require("express");
const { createServer } = require("node:http");
const path = require("path");
const cookieSession = require("cookie-session");
const cors = require("cors");
const { Server } = require("socket.io");

//controller
const userAuthRouter = require("./controller/user");
const messageMap = [];
const PORT = process.env.PORT || 4000;

// let socketConnection = new Set();
// io.on("connection", onConnection);

// function onConnection(socket) {
//   io.emit("get-connection", socket.id);
//   console.log(socket.id);
//   socketConnection.add(socket.id);

//   io.emit("client-total", socketConnection.size);
//   io.emit("all-message", messageMap);

//   socket.on("disconnect", () => {
//     console.log("socket diconected socet id", socket.id);
//     socketConnection.delete(socket.id);

//     io.emit("client-total", socketConnection.size);
//   });
//   //   console.log(socketConnection.size);

//   /**
//    * handling message event
//    */

//   socket.on("message", (data) => {
//     const newData = {
//       ...data,
//       senderId: socket.id,
//     };
//     messageMap.push(newData);
//     io.emit("all-message", messageMap);
//   });
// }

async function main(params) {
  const app = express();
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.json());
  app.use(
    cookieSession({
      keys: ["lkasld235j"],
    })
  );
  app.use(cors());
  app.use(userAuthRouter);

  const server = createServer(app);
  const io = new Server(server);
  server.listen(PORT, () => {
    console.log("server running at http://localhost:4000");
  });
}
main();
