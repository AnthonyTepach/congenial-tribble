const { Router } = require('express');
const pool = require('./config/bd');
const { getEmployeePunchTimes , getSingleEmployeeData} = require('./model/queries');

const router = Router();


router.get("/consulta", async (req, res) => {
  try {
    const { departamento, fecha_inicio, fecha_fin } = req.query;

    const result = await pool.query(getEmployeePunchTimes, [
      departamento,
      fecha_inicio,
      fecha_fin,
    ]);

    res.json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al ejecutar la consulta");
  }
});

router.get("/employee/:emp_code", async (req, res) => {
  try {
    const { emp_code } = req.params;
    const { fecha_inicio, fecha_fin } = req.query;

    const result = await pool.query(getSingleEmployeeData, [
      emp_code,
      fecha_inicio,
      fecha_fin,
    ]);

    res.json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al ejecutar la consulta");
  }
});

module.exports = router;
