const express = require("express");
const pool = require('./bd');
const routes = require('./routes');

const app = express();

pool.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos", err);
  } else {
    console.log("Conexión exitosa con la base de datos");
  }
});

app.use('/api', routes);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
