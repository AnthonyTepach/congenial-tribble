# BioTime Pro ZKTeco - API

API generada en Express.js, recupera los registos de entrada y salida de los empleados de un rango determindado de fechas

## API Reference

#### Get all items

```http
  GET /api/consulta
```

| Parameter      | Type     | Description   |
| :------------- | :------- | :------------ |
| `departamento` | `string` | **Required**. |
| `fecha_inicio` | `string` | **Required**. |
| `fecha_fin`    | `string` | **Required**. |

## SQL Query

`SELECT emp_code, first_name, last_name, position_name, dept_name,
        ( SELECT json_agg(json_build_object(
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
      ORDER BY emp_code ASC;`

## Authors

- [@anthonytepach](https://www.github.com/anthonytepach)

## License

[MIT](https://choosealicense.com/licenses/mit/)
