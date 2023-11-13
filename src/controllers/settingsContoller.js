const consultaMySQL = require('../models/settingsModel');

const SettingsController = {
  // Obtiene la configuración de un usuario por su ID
  getUserSettings: (req, res) => {
    const userId = req.params.id;
    consultaMySQL.getUserSettings(userId, (err, settings) => {
      if (err) {
        console.error('Error al obtener la configuración del usuario: ' + err.message);
        res.status(500).json({ error: 'Error al obtener la configuración del usuario' });
        return;
      }
      if (!settings) {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
        return;
      }
      res.json(settings);
    });
  },

  // Actualiza la configuración de un usuario por su ID
  updateUserSettings: (req, res) => {
    const userId = req.params.id;
    const updatedSettings = req.body;
    consultaMySQL.updateUserSettings(userId, updatedSettings, (err) => {
      if (err) {
        console.error('Error al actualizar la configuración del usuario: ' + err.message);
        res.status(500).json({ error: 'Error al actualizar la configuración del usuario' });
        return;
      }
      res.json({ mensaje: 'Configuración del usuario actualizada con éxito' });
    });
  },
};

module.exports = SettingsController;
