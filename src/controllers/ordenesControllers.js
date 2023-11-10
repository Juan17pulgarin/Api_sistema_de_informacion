const consultaMySQL = require('../models/ordenesModel');

const ordenesController = {
  createOrden: (newOrden, callback) => {
    if (!newOrden || !newOrden.fecha || !newOrden.direccion || !newOrden.descripcion) {
      callback('Faltan datos en la orden', null);
    } else {
      consultaMySQL.createOrden(newOrden, (err, resultado) => {
        if (err) {
          console.error('Error al crear la orden: ' + err.message);
          callback('Error al crear la orden', null);
        } else {
          callback(null, resultado);
        }
      });
    }
  },
};

module.exports = ordenesController;
