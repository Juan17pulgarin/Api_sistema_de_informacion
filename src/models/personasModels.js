const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const personasModel = {
  obtenerPrimerUsuario: (callback) => {
    pool.query('SELECT * FROM personas LIMIT 1', (err, resultados) => {
      if (err) {
        return callback(err, null);
      }
      if (resultados.length === 0) {
        return callback('No se encontraron usuarios', null);
      }

      const primerUsuario = resultados[0];
      return callback(null, primerUsuario);
    });
  },

  actualizarPrimerUsuario: (nombres, apellidos, direccion, callback) => {
    pool.query(
      'UPDATE personas SET primer_nombre = ?, segundo_nombre = ?, primer_apellido = ?, segundo_apellido = ?, direccion = ? LIMIT 1',
      [nombres.primer_nombre, nombres.segundo_nombre, apellidos.primer_apellido, apellidos.segundo_apellido, direccion],
      (err, resultado) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, resultado);
      }
    );
  },
};

module.exports = personasModel;
