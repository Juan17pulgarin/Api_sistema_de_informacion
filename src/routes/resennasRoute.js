const express = require('express');
const router = express.Router();
const resenasModels = require('../models/resenasModel');

router.post('/resenas', (req, res) => {
  const { comentario, calificacion } = req.body;

  resenasModels.agregarResena(comentario, calificacion, (err, result) => {
    if (err) {
      console.error('Error al agregar reseña: ' + err.message);
      res.status(500).json({ error: 'Error al agregar reseña' });
    } else {
      res.status(201).json({ mensaje: 'Reseña agregada con éxito', id: result.insertId });
    }
  });
});

module.exports = router;
