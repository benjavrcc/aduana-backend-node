import { readJSON } from "./_utils.js";

export default (req, res) => {
  const registros = readJSON("registros.json");

  res.status(200).json({
    total_registros: registros.length,
    registros: registros
  });
};
