const registroModel = require('../models/registroModel');

const registroController = {
  registrarUsuario: (req, res) => {
    const { nombre, contrasenna } = req.body;

    registroModel.registrarUsuario(nombre, contrasenna, (err, insertId) => {
      if (err) {
        console.error('Error al registrar el usuario: ' + err.message);
        res.status(500).json({ error: 'Error al registrar el usuario' });
      } else {
        res.status(201).json({ mensaje: 'Usuario registrado con éxito', id: insertId });
      }
    });
  },
};

module.exports = registroController;
