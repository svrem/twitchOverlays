import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.CREDS)),
  });
}

const db = admin.firestore();

export default async (req, res) => {
  try {
    const user = await admin.auth().verifyIdToken(req.headers.authorization);

    if (!user.email_verified) {
      res.end("");
      return;
    }

    const userRef = db.collection("users").doc(user.user_id);
    const doc = await userRef.get();
    if (doc.exists) {
      res.json(doc.data().channels);
      res.status(200);
      res.end();
      return;
    } else {
      userRef.set({
        channels: [],
      });
      res.json([]);
      res.status(200);
      res.end();
      // throw new Error("No user imagine");
    }

    res.status(200);
    res.end();
    return;
  } catch (err) {
    console.log(err);
    res.status(400);
    res.end();
    return;
  }
};
