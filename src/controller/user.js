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

      const userrecord = await getAuth().createUser({
        email: email,
        password: password,
        displayName: username,
      });

      const docRef = db.collection("users").doc(userrecord.uid);
      await docRef.set({
        username,
        email,
        password,
      });

      req.session.userId = userrecord.uid; // Proper session key

      return res.status(200).send({
        username,
        email,
      });
    } catch (error) {
      console.log(error);
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
      const docRef = db.collection("users").doc(userDoc.uid);
      const dataSnapeshot = await docRef.get();
      const { password: dataPAssword } = dataSnapeshot.data();
      if (dataPAssword !== password) {
        return res.status(400).send({
          error: "password does't match",
        });
      }

      req.session.userId = userDoc.uid;
      return res.status(200).send({
        email: userDoc.email,
        username: userDoc.displayName,
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
  console.log(userid);
  const userDocRef = db.collection(USER_DB).doc(userid);
  try {
    const userDoc = await userDocRef.get();
    const userSnapshot = userDoc.data();
    const { email, password } = userSnapshot;
    req.session.userId = userid;
    return res.status(200).send({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      error: "waith",
    });
  }
});

module.exports = userRouter;
