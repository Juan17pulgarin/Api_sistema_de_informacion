const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const registroModel = {
  registrarUsuario: (nombre, contrasenna, callback) => {
    const query = 'INSERT INTO usuarios (id_persona, nombre, contrasenna, estado) VALUES (1, ?, ?, 1)';
    const values = [nombre, contrasenna];

    pool.query(query, values, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.insertId);
      }
    });
  },
};

module.exports = registroModel;
