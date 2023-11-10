const express = require('express');
const router = express.Router();
const ordenesController = require('../controllers/ordenesControllers');

router.post('/ordenes', (req, res) => {
  const newOrden = req.body;
  ordenesController.createOrden(newOrden, (err, resultado) => {
    if (err) {
      console.error('Error al crear la orden: ' + err.message);
      res.status(500).json({ error: 'Error al crear la orden' });
      return;
    }
    res.status(201).json({ mensaje: 'Orden creada con éxito', id: resultado.insertId });
  });
});

module.exports = router;
