const { Router } = require("express");
const pool = require("./db");

const router = Router();

const sql = `
  SELECT emp_code, first_name, last_name, position_name, dept_name,
  (
    SELECT json_agg(json_build_object(
      'fecha', to_char(punch_time AT TIME ZONE 'America/Mexico_City', 'YYYY-MM-DD'),
      'hora', to_char(punch_time AT TIME ZONE 'America/Mexico_City', 'HH24:MI:SS'),
      'checo_en',terminal_alias
    ) ORDER BY punch_time ASC) -- Ordenar por punch_time ASC
    FROM iclock_transaction
    WHERE iclock_transaction.emp_id = personnel_employee.id
      AND punch_time AT TIME ZONE 'America/Mexico_City' BETWEEN $2 AND $3
  ) AS punch_times
  FROM personnel_employee
  INNER JOIN personnel_department
  ON personnel_department.id = personnel_employee.department_id
  INNER JOIN personnel_position
  ON personnel_position.id = personnel_employee.position_id
  WHERE dept_name = $1 
  AND is_active = 'true'
  AND EXISTS (
    SELECT 1
    FROM iclock_transaction
    WHERE iclock_transaction.emp_id = personnel_employee.id
      AND punch_time AT TIME ZONE 'America/Mexico_City' BETWEEN $2 AND $3
  )
  ORDER BY emp_code ASC;
`;

router.get("/consulta", async (req, res) => {
  try {
    const { departamento, fecha_inicio, fecha_fin } = req.query;

    const result = await pool.query(sql, [
      departamento,
      fecha_inicio,
      fecha_fin,
    ]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al ejecutar la consulta");
  }
});

module.exports = router;
