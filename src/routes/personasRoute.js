const express = require('express');
const router = express.Router();
const personasController = require('../controllers/personasControllers');
const { body, validationResult } = require('express-validator');

const validarNombreCompleto = body('nombre_completo').isLength({ min: 1 });
const validarEmail = body('email').isEmail();
const validarDireccion = body('direccion').isLength({ min: 1 });
const validarTipo = body('tipo').isLength({ min: 1 });

router.get('/usuarios/primer-usuario', (req, res) => {
  personasController.obtenerPrimerUsuario(req, res);
});

router.put('/usuarios/primer-usuario', [
  validarNombreCompleto,
  validarEmail,
  validarDireccion,
  validarTipo,
],
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  personasController.actualizarPrimerUsuario(req, res);
});

module.exports = router;
