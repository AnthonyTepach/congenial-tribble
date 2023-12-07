const express = require("express");
const https = require("https"); // Importar el módulo HTTPS de Node.js
const fs = require("fs");

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

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Hubo un error en el servidor' });
});

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});

// Cerrar la conexión a la base de datos cuando se detiene la aplicación
app.on('close', () => {
  pool.end();
});