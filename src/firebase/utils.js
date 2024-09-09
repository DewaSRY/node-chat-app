const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

const phat = require("path");

const accessToke = phat.join(__dirname, "..", "..", "serviceAccoutKey.json");
const serviceAccount = require(accessToke);

initializeApp({
  credential: cert(serviceAccount),
});

const USER_DB = "users";
const CHAT_DB = "chat";

module.exports = {
  db: getFirestore(),
  USER_DB,
  CHAT_DB,
};
