//
const express = require("express");
const { createServer } = require("node:http");
const path = require("path");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { Server } = require("socket.io");

const userAuthRouter = require("./controller/user");
const friendRouter = require("./controller/friends");
const {
  CONNECTION,
  onConnection,
  CHAT_MESSAGE,
  START_MESSAGE,
  chatMessageGetALL,
  storeChatText,
} = require("./socket-utils");
const PORT = process.env.PORT || 4000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

async function main(params) {
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.json());
  app.use(
    cookieSession({
      keys: ["lkasld235j"],
      secure: process.env.NODE_ENV === "production", // enable secure cookies only in production
      sameSite: "None", // Allow cross-site cookie usage
      httpOnly: true, // Helps prevent XSS attacks
    })
  );
  app.use(cookieParser("1234"));
  app.use(
    cors({
      origin: "*", // or your React app's origin
    })
  );
  app.use(userAuthRouter);
  app.use(friendRouter);

  io.on(CONNECTION, async (socket) => {
    socket.on(START_MESSAGE, async () => {
      try {
        const allMessage = await chatMessageGetALL();
        io.emit(START_MESSAGE, allMessage);
      } catch (error) {}
    });

    socket.on(CHAT_MESSAGE, async ({ text, senderName }) => {
      await storeChatText({ text, senderName });
      io.emit(CHAT_MESSAGE, { text, senderName });
    });
  });

  server.listen(PORT, process.env.HOST ?? "localhost", () => {
    console.log(`currently  at ${process.env.HOST}/${PORT}`);
    console.log(`on dev server running at http://localhost:4000`);
  });
}
main();
