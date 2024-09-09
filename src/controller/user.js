const { Router } = require("express");
const { getAuth } = require("firebase-admin/auth");

const {
  requireEmail,
  requirePassword,
  requireUsername,
} = require("./validator");
const { db, USER_DB } = require("../firebase/utils");
const userRouter = Router();

userRouter.post(
  "/api/register",
  [requireEmail, requirePassword, requireUsername],
  async (req, res) => {
    try {
      const { email, username, password } = req.body;

      const findDuplicateUserName = await db
        .collection(USER_DB)
        .where("username", "==", username)
        .get();
      if (findDuplicateUserName.size !== 0) {
        return res.status(409).send({
          error: "username already register",
        });
      }

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
        id: userrecord.uid,
        friends: [],
      });

      req.session.userId = userrecord.uid;
      req.session.currentUsername = username;

      return res.status(200).send({
        username,
        email,
        friends: [],
        id: userrecord.uid,
      });
    } catch (error) {
      console.log(error);
      return res.status(409).send({
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
      const dataSnapeshot = await userRef.get();
      const { password: dataPAssword, id, friends } = dataSnapeshot.data();

      if (dataPAssword !== password) {
        return res.status(400).send({
          error: "password does't match",
        });
      }
      req.session.userId = userDoc.uid;
      req.session.currentUsername = userDoc.displayName;
      return res.status(200).send({
        email: userDoc.email,
        username: userDoc.displayName,
        id,
        friends,
      });
    } catch (error) {
      return res.status(404).send({
        error: "user not found",
      });
    }
  }
);

userRouter.get("/api/sigin", async (req, res) => {
  const userid = req.session.userId;
  console.log("hite this ", req.session);

  if (!userid) {
    return res.status(404).send({
      error: "you are not auth",
    });
  }
  const userDocRef = db.collection(USER_DB).doc(userid);
  try {
    const userDoc = await userDocRef.get();
    const userSnapshot = userDoc.data();

    const { email, id, username, friends } = userSnapshot;
    req.session.userId = userid;
    req.session.currentUsername = username;
    return res.status(200).send({
      email: email,
      username: username,
      id: id,
      friends: friends,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      error: "failed to sigin",
    });
  }
});

module.exports = userRouter;
