import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.CREDS)),
  });
}

const db = admin.firestore();

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const user = await admin
        .auth()
        .verifyIdToken(req.headers.authorization)
        .catch(() => {
          res.status(400);

          res.end("No user Imagineenenenenen");
          return;
        });
      if (!user.email_verified) {
        res.status(400);

        res.end("No user imagine");
        return;
      }

      const userRef = db.collection("users").doc(user.user_id);
      const doc = await userRef.get();
      if (doc.exists) {
        await userRef.update({ channels: req.body.channels });
        res.status(200);
        res.end();
        return;
      } else {
        res.status(200);
        res.end();
        return;
      }
    } catch (err) {
      res.status(400);
      res.end(err);
      return;
    }
  }
};
