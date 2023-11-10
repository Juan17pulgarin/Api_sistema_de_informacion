const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const consultaMySQL = {
  createOrden: (newOrden, callback) => {
    if (!newOrden || !newOrden.fecha || !newOrden.direccion || !newOrden.descripcion) {
      callback('Faltan datos en la orden', null);
    } else {
      pool.query('INSERT INTO pedidos (fecha, direccion, descripcion) VALUES (?, ?, ?)', [newOrden.fecha, newOrden.direccion, newOrden.descripcion], (err, resultado) => {
        if (err) {
          console.error('Error al crear la orden: ' + err.message);
          callback('Error al crear la orden', null);
        } else {
          callback(null, { mensaje: 'Orden creada con éxito', id: resultado.insertId });
        }
      });
    }
  },
};

module.exports = consultaMySQL;
