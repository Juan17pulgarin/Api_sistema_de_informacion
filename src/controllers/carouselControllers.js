const consultaMySQL = require('../models/carouselModel');

const carouselControllers = {
  // Obtiene todos los comentarios
  getAllComentarios: (req, res) => {
    consultaMySQL.getAllCards((err, comentarios) => {
      if (err) {
        console.error('Error al obtener tarjeta: ' + err.message);
        res.status(500).json({ error: 'Error al obtener tarjeta' });
        return;
      }
      res.json(comentarios);
    });
  },

  // Obtiene un comentario por su ID
  getCardsById: (req, res) => {
    const id = req.params.id;
    consultaMySQL.getResennaById(id, (err, comentario) => {
      if (err) {
        console.error('Error al obtener la tarjeta: ' + err.message);
        res.status(500).json({ error: 'Error al obtener la tarjeta' });
        return;
      }
      if (!comentario) {
        res.status(404).json({ mensaje: 'tarjeta no encontrado' });
        return;
      }
      res.json(comentario);
    });
  },

  // Crea un nuevo comentario
  createCards: (req, res) => {
    const newComentario = req.body;
    consultaMySQL.createResenna(newComentario, (err, resultado) => {
      if (err) {
        console.error('Error al crear la tarjeta: ' + err.message);
        res.status(500).json({ error: 'Error al crear la tarjeta' });
        return;
      }
      res.status(201).json({ mensaje: 'tarjeta creado con éxito', id: resultado.insertId });
    });
  },

  // Actualiza un comentario existente por su ID
  updateCards: (req, res) => {
    const id = req.params.id;
    const updatedComentario = req.body;
    consultaMySQL.updateResenna(id, updatedComentario, (err) => {
      if (err) {
        console.error('Error al actualizar la tarjeta: ' + err.message);
        res.status(500).json({ error: 'Error al actualizar la tarjeta' });
        return;
      }
      res.json({ mensaje: 'Comentario actualizado con éxito' });
    });
  },

  // Elimina un comentario por su ID
  deleteCards: (req, res) => {
    const id = req.params.id;
    consultaMySQL.deleteResenna(id, (err) => {
      if (err) {
        console.error('Error al eliminar el comentario: ' + err.message);
        res.status(500).json({ error: 'Error al eliminar la tarjeta' });
        return;
      }
      res.json({ mensaje: 'tarjeta eliminada con éxito' });
    });
  },
};

module.exports = carouselControllers;
