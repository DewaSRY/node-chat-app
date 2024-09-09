import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
// const URL =
//   process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

export const socket = io(`http://localhost:4000`);
// export const socket = io(
//   `ws://${import.meta.env.VITE_BE_URL ?? "http://localhost:4000"}`
// );
export const CHAT_MESSAGE = "chat-message";
export const START_MESSAGE = "start-message";
