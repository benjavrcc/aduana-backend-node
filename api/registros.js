import { db } from "./firebase.js";

export default async function handler(req, res) {
  try {
    const snapshot = await db.collection("registros").orderBy("timestamp", "desc").get();

    const registros = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return res.status(200).json({
      total_registros: registros.length,
      registros
    });

  } catch (e) {
    return res.status(500).json({
      error: "Error leyendo Firestore",
      detalle: e.toString()
    });
  }
}
