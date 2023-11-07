const resenasModel = require('../models/resenasModel');

const resenasController = {
  agregarResena: (req, res) => {
    const { comentario, calificacion } = req.body;

    resenasModel.agregarResena(comentario, calificacion, (err, result) => {
      if (err) {
        console.error('Error al agregar reseña: ' + err.message);
        res.status(500).json({ error: 'Error al agregar reseña' });
      } else {
        res.status(201).json({ mensaje: 'Reseña agregada con éxito', id: result.insertId });
      }
    });
  },
};

module.exports = resenasController;
