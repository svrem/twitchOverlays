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
      const record = await admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
      });

      admin.user;
    } catch (err) {
      // res.status(400);
      res.json({ message: err.message });
      return;
    }
    // res.status(200);
    res.json({});
  }
};
