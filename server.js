const express = require("express");
const pool = require('./src/config/bd');
const routes = require('./src/routes');

const app = express();

pool.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos", err);
  } else {
    console.log("Conexión exitosa con la base de datos");
  }
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use('/api', routes);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});