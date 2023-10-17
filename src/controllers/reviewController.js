const consultaMySQL = require('../models/reviewModel');

const ComentarioController = {
  // Obtiene todos los comentarios
  getAllComentarios: (req, res) => {
    consultaMySQL.getAllResennas((err, comentarios) => {
      if (err) {
        console.error('Error al obtener comentarios: ' + err.message);
        res.status(500).json({ error: 'Error al obtener comentarios' });
        return;
      }
      res.json(comentarios);
    });
  },

  // Obtiene un comentario por su ID
  getComentarioById: (req, res) => {
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
  },

  // Crea un nuevo comentario
  createComentario: (req, res) => {
    const newComentario = req.body;
    consultaMySQL.createResenna(newComentario, (err, resultado) => {
      if (err) {
        console.error('Error al crear el comentario: ' + err.message);
        res.status(500).json({ error: 'Error al crear el comentario' });
        return;
      }
      res.status(201).json({ mensaje: 'Comentario creado con éxito', id: resultado.insertId });
    });
  },

  // Actualiza un comentario existente por su ID
  updateComentario: (req, res) => {
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
  },

  // Elimina un comentario por su ID
  deleteComentario: (req, res) => {
    const id = req.params.id;
    consultaMySQL.deleteResenna(id, (err) => {
      if (err) {
        console.error('Error al eliminar el comentario: ' + err.message);
        res.status(500).json({ error: 'Error al eliminar el comentario' });
        return;
      }
      res.json({ mensaje: 'Comentario eliminado con éxito' });
    });
  },
};

module.exports = ComentarioController;
