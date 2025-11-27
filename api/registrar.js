import { db } from "./firebase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const data = req.body;

    await db.collection("registros").add({
      fecha_llegada: data.fecha_llegada,
      hora_llegada: data.hora_llegada,
      cantidad_viajeros: data.cantidad_viajeros,
      timestamp: Date.now()
    });

    return res.status(200).json({ ok: true, mensaje: "Guardado en Firestore" });
  } catch (e) {
    return res.status(500).json({ error: "Error guardando en Firestore", detalle: e.toString() });
  }
}
