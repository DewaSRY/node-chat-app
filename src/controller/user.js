const { Router } = require("express");
const { getAuth } = require("firebase-admin/auth");

const {
  requireEmail,
  requirePassword,
  requireUsername,
} = require("./validator");
const { db, USER_DB, USER_CHAT_DB } = require("../firebase/utils");
const userRouter = Router();

userRouter.post(
  "/api/register",
  [requireEmail, requirePassword, requireUsername],
  async (req, res) => {
    try {
      const { email, username, password } = req.body;

      const userrecord = await getAuth().createUser({
        email: email,
        password: password,
        displayName: username,
      });

      const userRef = db.collection(USER_DB).doc(userrecord.uid);
      await userRef.set({
        username,
        email,
        password,
      });
      const userChatRef = db.collection(USER_CHAT_DB).doc(userrecord.uid);
      await userChatRef.set({
        chat: [],
      });
      req.session.userId = userrecord.uid; // Proper session key

      return res.status(200).send({
        username,
        email,
        chat: [],
      });
    } catch (error) {
      return res.status(404).send({
        error: "failed to register",
      });
    }
  }
);
userRouter.post(
  "/api/login",
  [requireEmail, requirePassword],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const userDoc = await getAuth().getUserByEmail(email);
      const userRef = db.collection(USER_DB).doc(userDoc.uid);
      const userChatRef = db.collection(USER_CHAT_DB).doc(userDoc.uid);

      const dataSnapeshot = await userRef.get();

      const { password: dataPAssword } = dataSnapeshot.data();

      if (dataPAssword !== password) {
        return res.status(400).send({
          error: "password does't match",
        });
      }
      const userChatSnapeshot = await userChatRef.get();
      const { chat } = userChatSnapeshot.data();

      req.session.userId = userDoc.uid;
      return res.status(200).send({
        email: userDoc.email,
        username: userDoc.displayName,
        chat: chat,
      });
    } catch (error) {
      return res.status(404).send({
        error: "user not found",
      });
    }
  }
);

userRouter.get("/api/signin", async (req, res) => {
  const userid = req.session.userId;
  if (!userid) {
    return res.status(404).send({
      error: "you are not auth",
    });
  }
  const userDocRef = db.collection(USER_DB).doc(userid);
  const userChatRef = db.collection(USER_CHAT_DB).doc(userid);
  try {
    const userDoc = await userDocRef.get();
    const userChatDoc = await userChatRef.get();
    const userSnapshot = userDoc.data();
    const userChatSnapshot = userChatDoc.data();

    const { email, password } = userSnapshot;
    const { chat } = userChatSnapshot;
    req.session.userId = userid;
    return res.status(200).send({
      email,
      password,
      chat,
    });
  } catch (error) {
    return res.status(404).send({
      error: "waith",
    });
  }
});

module.exports = userRouter;
