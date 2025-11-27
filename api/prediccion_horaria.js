import { readPredicciones } from "./_utils.js";
import { calcularEdiario } from "./_utils.js";
import { distribucionHoraria } from "./_utils.js";

const MESES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre"
];

export default (req, res) => {
  const fecha = req.query.fecha;

  if (!fecha) {
    res.status(400).json({ error: "Falta parámetro fecha" });
    return;
  }

  const f = new Date(fecha);
  const mesNombre = MESES[f.getMonth()];

  const pred = readPredicciones().find(
    p => p.MES === mesNombre && p.ANIO === f.getFullYear()
  );

  if (!pred) {
    res.status(404).json({ error: "No existe predicción para ese mes" });
    return;
  }

  const E_mes = pred.PREDICCION;

  const E_dia = calcularEdiario(E_mes, fecha);

  const horas = distribucionHoraria(E_dia);

  res.status(200).json({
    fecha,
    mes: mesNombre,
    E_mes: Math.round(E_mes),
    E_dia: Math.round(E_dia),
    horas
  });
};
