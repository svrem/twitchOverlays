import admin from "firebase-admin";
import serviceAccount from "../../creds.json";

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const db = admin.firestore();

export default async (req, res) => {
  try {
    const user = await admin.auth().verifyIdToken(req.headers.authorization);

    const userRef = db.collection("users").doc(user.user_id);
    const doc = await cityRef.get();
    console.log(doc.exists);

    res.status(200);
    res.end();
    return;
  } catch (err) {
    // console.log(err);
    res.status(400);
    res.end();
    return;
  }
  console.log(user);
  res.end();
};
