import { readJSON, writeJSON } from "./_utils.js";

export default (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const body = req.body;

  if (!body.fecha_llegada || !body.hora_llegada || body.cantidad_viajeros == null) {
    res.status(400).json({ error: "Datos incompletos" });
    return;
  }

  const registros = readJSON("registros.json");
  registros.push(body);
  writeJSON("registros.json", registros);

  res.status(200).json({
    ok: true,
    total_registros: registros.length
  });
};
