const { Socket, Server } = require("socket.io");
const { db, CHAT_DB } = require("./firebase/utils");
const crypto = require("crypto");
const CONNECTION = "connection";
const DISCONNECT = "disconnect";
const CHAT_MESSAGE = "chat-message";
const START_MESSAGE = "start-message";
/**
 *
 * @param {Server} io
 * @param {Socket} socket
 */
async function onConnection(io, socket) {}

/**
 *
 * @param {{chatId:string, text:string, senderId:string}} param0
 */
async function storeChatText({ text, senderName }) {
  const salt = crypto.randomBytes(8).toString("hex");
  const chatRef = db.collection(CHAT_DB).doc(salt);
  await chatRef.set({
    text,
    senderName,
    createAt: Date.now(),
  });
}

/**
 *
 * @param {chatId} param0
 * @returns { [ {text:string,senderId:string }]} messages
 */
async function chatMessageGetALL() {
  const dataSnapeshot = await db.collection(CHAT_DB).get();
  const allData = [];
  dataSnapeshot.forEach((doc) => {
    allData.push(doc.data());
  });
  return allData;
}

module.exports = {
  onConnection,
  CONNECTION,
  storeChatText,
  chatMessageGetALL,
  START_MESSAGE,
  CHAT_MESSAGE,
};

// async function main() {
//   const data = await chatMessageGetALL();
//   console.log(data);
// }

// main();
