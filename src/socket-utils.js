const { Socket, Server } = require("socket.io");
const CONNECTION = "connection";
const DISCONNECT = "disconnect";
const CHAT_MESSAGE = "chat-message";
/**
 *
 * @param {Server} io
 * @param {Socket} socket
 */
function onConnection(io, socket) {}
