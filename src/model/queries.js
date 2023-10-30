const getEmployeePunchTimes = `
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
  AND EXISTS (
    SELECT 1
    FROM iclock_transaction
    WHERE iclock_transaction.emp_id = personnel_employee.id
      AND punch_time AT TIME ZONE 'America/Mexico_City' BETWEEN $2 AND $3
  )
  ORDER BY emp_code ASC;
`;

const getSingleEmployeeData = `
  SELECT emp_code, first_name, last_name, position_name, dept_name,  -- Agregar una coma aquí
  (
    SELECT json_agg(json_build_object(
      'fecha', to_char(punch_time AT TIME ZONE 'America/Mexico_City', 'YYYY-MM-DD'),
      'hora', to_char(punch_time AT TIME ZONE 'America/Mexico_City', 'HH24:MI:SS'),
      'checo_en', terminal_alias
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
  WHERE emp_code = $1
  AND EXISTS (
    SELECT 1
    FROM iclock_transaction
    WHERE iclock_transaction.emp_id = personnel_employee.id
      AND punch_time AT TIME ZONE 'America/Mexico_City' BETWEEN $2 AND $3
  )
`;


module.exports = { getEmployeePunchTimes, getSingleEmployeeData};