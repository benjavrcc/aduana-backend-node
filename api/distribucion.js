import { readJSON } from "./_utils.js";

// Función: genera distribución real con suavizado tipo Python
function generarDistribucionHoraria(registros, esperado) {
  // Contadores por hora 0–23
  const conteos = Array(24).fill(0);

  for (const r of registros) {
    const hora = parseInt(r.hora_llegada.split(":")[0]); // "14:30" → 14
    if (!isNaN(hora) && hora >= 0 && hora < 24) {
      conteos[hora] += 1;
    }
  }

  // Suavizado para evitar ceros (igual que tu Python)
  const suav = 0.1;
  const suavizados = conteos.map(c => c + suav);

  const total = suavizados.reduce((a, b) => a + b, 0);

  // Probabilidad por hora
  const p_hora = suavizados.map(x => x / total);

  // Predicción horaria
  const pred = p_hora.map(p => p * esperado);

  // Resultado final
  return Array.from({ length: 24 }, (_, hora) => ({
    hora,
    conteo_real: conteos[hora],
    p_hora: p_hora[hora],
    pred_hora: pred[hora]
  }));
}

export default (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const esperado = req.body.esperado;

  if (!esperado || esperado <= 0) {
    res.status(400).json({ error: "Falta valor 'esperado' válido" });
    return;
  }

  const registros = readJSON("registros.json");

  if (registros.length === 0) {
    res.status(400).json({ error: "No hay registros suficientes" });
    return;
  }

  const resultado = generarDistribucionHoraria(registros, esperado);

  res.status(200).json(resultado);
};
