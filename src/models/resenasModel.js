const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const resenasModel = {
  agregarResena: (comentario, calificacion, callback) => {
    const query = 'INSERT INTO resennas (comentario, calificacion) VALUES (?, ?)';
    const values = [comentario, calificacion];

    pool.query(query, values, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.insertId);
      }
    });
  },
};

module.exports = resenasModel;
