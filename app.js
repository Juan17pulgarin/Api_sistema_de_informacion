// Librerias
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql"); 
require("dotenv").config();

// Routes
const ComentarioRoutes = require("./src/routes/reviewRoute");

const app = express();

// Datos codificados en URL
app.use(bodyParser.urlencoded({ extended: true }));

// Analiza objeto JSON
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get('/status', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'Servidor Corriendo'
    })
});

// Conexion a base de datos MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE, 
  });

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos MySQL: ' + err.message);
    throw err;
  }
  console.log('Base de Datos MySQL Connected');
});

// Setting Routes
app.use("/api", ComentarioRoutes);

// Export
module.exports = app;

