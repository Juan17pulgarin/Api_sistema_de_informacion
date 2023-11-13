const ordenesController = require('../../controllers/ordenesControllers');
const consultaMySQL = require('../../models/ordenesModel');

jest.mock('../../models/ordenesModel');

describe('Ordenes Controller', () => {
  it('should create an order successfully', () => {
    const mockNewOrden = {
      fecha: '2023-11-13',
      direccion: 'Calle Principal',
      descripcion: 'Descripción de la orden',
    };

    const mockResultado = { id: 1, mensaje: 'Orden creada exitosamente' };

    const mockCallback = jest.fn();

    consultaMySQL.createOrden.mockImplementationOnce((newOrden, callback) => {
      callback(null, mockResultado);
    });

    ordenesController.createOrden(mockNewOrden, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(null, mockResultado);
  });

  it('should handle missing data in the order', () => {
    const mockNewOrden = {
      fecha: '2023-11-13',
      direccion: 'Calle Principal',
      // No description field included
    };

    const mockCallback = jest.fn();

    ordenesController.createOrden(mockNewOrden, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith('Faltan datos en la orden', null);
  });

  it('should handle error in creating the order', () => {
    const mockNewOrden = {
      fecha: '2023-11-13',
      direccion: 'Calle Principal',
      descripcion: 'Descripción de la orden',
    };

    const mockError = new Error('Database error');

    const mockCallback = jest.fn();

    consultaMySQL.createOrden.mockImplementationOnce((newOrden, callback) => {
      callback(mockError, null);
    });

    ordenesController.createOrden(mockNewOrden, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith('Error al crear la orden', null);
  });
});
