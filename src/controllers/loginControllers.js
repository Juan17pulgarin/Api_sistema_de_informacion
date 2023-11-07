const loginModel = require('../models/loginModel');

const loginController = {
  comprobarUsuario: (req, res) => {
    const { username, password } = req.body;

    loginModel.consultaUser(username, password, (err, user) => {
      if (err) {
        console.error('Error al consultar usuario: ' + err.message);
        res.status(500).json({ error: 'Error al consultar usuario' });
        return;
      }
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else if (user.contrasenna !== password) {
        res.status(401).json({ error: 'Contraseña incorrecta' });
      } else {
        res.status(200).json({ mensaje: 'Usuario autenticado' });
      }
    });
  },
};

module.exports = loginController;
