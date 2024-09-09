const { Router, request, response } = require("express");
const { getAuth } = require("firebase-admin/auth");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
const crypto = require("crypto");

const {
  requireEmail,
  requirePassword,
  requireUsername,
} = require("./validator");
const { db, USER_DB, USER_CHAT_DB, CHAT_DB } = require("../firebase/utils");
const { firestore } = require("firebase-admin");
const friendsRouter = Router();
/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(400).send({
      error: "you are auth",
    });
  }
  next();
}

friendsRouter.get("/api/friend", requireAuth, async (reg, res) => {
  const currentId = reg.session.userId;
  const dataSnapeshot = await db.collection(USER_DB).get();
  let allData = [];
  dataSnapeshot.forEach((doc) => {
    const { password, ...res } = doc.data();
    if (res.id !== currentId) {
      allData.push(res);
    }
  });
  res.status(200).send(allData);
});

friendsRouter.post("/api/friend/:id", requireAuth, async (reg, res) => {
  const currentId = reg.session.userId;
  const currentUsername = reg.session.currentUsername;
  const friendId = reg.params.id;

  const userRef = db.collection(USER_DB).doc(currentId);
  const friendRef = db.collection(USER_DB).doc(friendId);
  const userChatRef = db.collection(USER_CHAT_DB).doc(currentId);
  const friendChatRef = db.collection(USER_CHAT_DB).doc(friendId);

  const friendSnapeshot = await friendRef.get();
  const friendData = friendSnapeshot.data();
  if (!friendData) {
    return res.status(404).send({
      error: "data not found",
    });
  }
  const { username } = friendData;
  const salt = crypto.randomBytes(8).toString("hex");
  const chatRef = db.collection(CHAT_DB).doc(salt);
  await chatRef.set({
    message: [],
  });
  await userRef.update({
    friends: FieldValue.arrayUnion(friendId),
  });
  await friendRef.update({
    friends: FieldValue.arrayUnion(currentId),
  });
  const currentDate = Date.now();
  await userChatRef.update({
    chat: FieldValue.arrayUnion({
      chatId: salt,
      latesMessage: "",
      updateAt: currentDate,
      friendName: username,
    }),
  });

  await friendChatRef.update({
    chat: FieldValue.arrayUnion({
      chatId: salt,
      latesMessage: "",
      updateAt: currentDate,
      friendName: currentUsername,
    }),
  });
  return res.status(200).send({
    chatId: salt,
    latesMessage: "",
    updateAt: currentDate,
    friendName: username,
  });
});

module.exports = friendsRouter;
