const personasController = require('../controllers/personasControllers');
const personasModel = require('../models/personasModels');

jest.mock('../../models/personasModels');

describe('Personas Controller', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {
        primer_nombre: 'John',
        segundo_nombre: 'Doe',
        primer_apellido: 'Smith',
        segundo_apellido: 'Johnson',
        direccion: '123 Main St',
      },
    };

    mockResponse = {
      json: jest.fn(),
      status: jest.fn(() => mockResponse),
    };
  });

  it('should obtain the first user successfully', () => {
    const mockPrimerUsuario = { nombre: 'John Doe', apellido: 'Smith Johnson' };

    personasModel.obtenerPrimerUsuario.mockImplementationOnce((callback) => {
      callback(null, mockPrimerUsuario);
    });

    personasController.obtenerPrimerUsuario(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockPrimerUsuario);
  });

  it('should update the first user successfully', () => {
    const mockResultado = { affectedRows: 1 };

    personasModel.actualizarPrimerUsuario.mockImplementationOnce((nombres, apellidos, direccion, callback) => {
      callback(null, mockResultado);
    });

    personasController.actualizarPrimerUsuario(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({ mensaje: 'Usuario actualizado con éxito', filasAfectadas: mockResultado.affectedRows });
  });

  it('should handle error in obtaining the first user', () => {
    const mockError = new Error('Database error');

    personasModel.obtenerPrimerUsuario.mockImplementationOnce((callback) => {
      callback(mockError, null);
    });

    personasController.obtenerPrimerUsuario(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error al obtener el primer usuario' });
  });

  it('should handle error in updating the first user', () => {
    const mockError = new Error('Database error');

    personasModel.actualizarPrimerUsuario.mockImplementationOnce((nombres, apellidos, direccion, callback) => {
      callback(mockError, null);
    });

    personasController.actualizarPrimerUsuario(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error al actualizar el primer usuario' });
  });
});
