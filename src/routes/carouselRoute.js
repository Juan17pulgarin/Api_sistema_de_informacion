const express = require('express');
const router = express.Router();
const consultaMySQL = require('../models/carouselModel');

// Ruta para obtener todas las
router.get('/tarjetas', (req, res) => {
  consultaMySQL.getAllCards((err, comentarios) => {
    if (err) {
      console.error('Error al obtener tarjeta: ' + err.message);
      res.status(500).json({ error: 'Error al obtener tarjeta' });
      return;
    }
    res.json(comentarios);
  });
});

// Ruta para obtener una tarjeta por ID
router.get('/tarjetas/:id', (req, res) => {
  const id = req.params.id;
  consultaMySQL.getCardsById(id, (err, comentario) => {
    if (err) {
      console.error('Error al obtener la tarjeta: ' + err.message);
      res.status(500).json({ error: 'Error al obtener el tarjeta' });
      return;
    }
    if (!comentario) {
      res.status(404).json({ mensaje: 'Tarjeta no creada' });
      return;
    }
    res.json(comentario);
  });
});

// Ruta para crear una nueva tarjeta
router.post('/tarjetas', (req, res) => {
  const newComentario = req.body; 
  consultaMySQL.createCards(newComentario, (err, resultado) => {
    if (err) {
      console.error('Error al crear el comentario: ' + err.message);
      res.status(500).json({ error: 'Error al crear la tarjeta' });
      return;
    }
    res.status(201).json({ mensaje: 'Tarjetas creada con éxito', id: resultado.insertId });
  });
});

// Ruta para actualizar una tarjeta
router.put('/tarjetas/:id', (req, res) => {
  const id = req.params.id;
  const updatedComentario = req.body; 
  consultaMySQL.updateCards(id, updatedComentario, (err) => {
    if (err) {
      console.error('Error al actualizar la tarjeta: ' + err.message);
      res.status(500).json({ error: 'Error al actualizar la tarjeta' });
      return;
    }
    res.json({ mensaje: 'Tarjetas actualizado con éxito' });
  });
});

// Ruta para eliminar una tarjeta por ID
router.delete('//:id', (req, res) => {
  const id = req.params.id;
  consultaMySQL.deleteCards(id, (err) => {
    if (err) {
      console.error('Error al eliminar el comentario: ' + err.message);
      res.status(500).json({ error: 'Error al eliminar la tarjeta' });
      return;
    }
    res.json({ mensaje: 'Tarjetas eliminado con éxito' });
  });
});

module.exports = router;
