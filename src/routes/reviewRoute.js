const express = require('express');
const router = express.Router();
const consultaMySQL = require('../models/reviewModel');

// Ruta para obtener todos los comentarios
router.get('/comentarios', (req, res) => {
  consultaMySQL.getAllResennas((err, comentarios) => {
    if (err) {
      console.error('Error al obtener comentarios: ' + err.message);
      res.status(500).json({ error: 'Error al obtener comentarios' });
      return;
    }
    res.json(comentarios);
  });
});

// Ruta para obtener un comentario por ID
router.get('/comentarios/:id', (req, res) => {
  const id = req.params.id;
  consultaMySQL.getResennaById(id, (err, comentario) => {
    if (err) {
      console.error('Error al obtener el comentario: ' + err.message);
      res.status(500).json({ error: 'Error al obtener el comentario' });
      return;
    }
    if (!comentario) {
      res.status(404).json({ mensaje: 'Comentario no encontrado' });
      return;
    }
    res.json(comentario);
  });
});

// Ruta para crear un nuevo comentario
router.post('/comentarios', (req, res) => {
  const newComentario = req.body; 
  consultaMySQL.createResenna(newComentario, (err, resultado) => {
    if (err) {
      console.error('Error al crear el comentario: ' + err.message);
      res.status(500).json({ error: 'Error al crear el comentario' });
      return;
    }
    res.status(201).json({ mensaje: 'Comentario creado con éxito', id: resultado.insertId });
  });
});

// Ruta para actualizar un comentario existente
router.put('/comentarios/:id', (req, res) => {
  const id = req.params.id;
  const updatedComentario = req.body; 
  consultaMySQL.updateResenna(id, updatedComentario, (err) => {
    if (err) {
      console.error('Error al actualizar el comentario: ' + err.message);
      res.status(500).json({ error: 'Error al actualizar el comentario' });
      return;
    }
    res.json({ mensaje: 'Comentario actualizado con éxito' });
  });
});

// Ruta para eliminar un comentario por ID
router.delete('/comentarios/:id', (req, res) => {
  const id = req.params.id;
  consultaMySQL.deleteResenna(id, (err) => {
    if (err) {
      console.error('Error al eliminar el comentario: ' + err.message);
      res.status(500).json({ error: 'Error al eliminar el comentario' });
      return;
    }
    res.json({ mensaje: 'Comentario eliminado con éxito' });
  });
});

module.exports = router;
