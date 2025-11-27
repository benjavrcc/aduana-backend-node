import fs from "fs";
import path from "path";
import Papa from "papaparse";

// Ruta a la carpeta data
export const dataPath = path.join(process.cwd(), "data");

// Leer JSON (registros)
export function readJSON(file) {
  const filePath = path.join(dataPath, file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Guardar JSON
export function writeJSON(file, data) {
  const filePath = path.join(dataPath, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Leer CSV (predicciones 2025)
export function readPredicciones() {
  const csvPath = path.join(dataPath, "predicciones_2025.csv");
  const csv = fs.readFileSync(csvPath, "utf8");

  const parsed = Papa.parse(csv, { header: true });

  return parsed.data.map(row => ({
    MES: row.MES.toLowerCase().trim(),
    ANIO: parseInt(row.ANIO),
    PREDICCION: parseFloat(row.PREDICCION)
  }));
}
