const personasModel = require('../models/personasModels');

const personasController = {
  obtenerPrimerUsuario: (req, res) => {
    personasModel.obtenerPrimerUsuario((err, primerUsuario) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener el primer usuario' });
      }
      res.json(primerUsuario);
    });
  },

  actualizarPrimerUsuario: (req, res) => {
    const nombres = {
      primer_nombre: req.body.primer_nombre,
      segundo_nombre: req.body.segundo_nombre,
    };

    const apellidos = {
      primer_apellido: req.body.primer_apellido,
      segundo_apellido: req.body.segundo_apellido,
    };

    const direccion = req.body.direccion;

    personasModel.actualizarPrimerUsuario(nombres, apellidos, direccion, (err, resultado) => {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar el primer usuario' });
      }
      res.json({ mensaje: 'Usuario actualizado con éxito', filasAfectadas: resultado.affectedRows });
    });
  },
};

module.exports = personasController;
