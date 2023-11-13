const resenasController = require('../../controllers/resenasController');
const resenasModel = require('../../models/resenasModel');

jest.mock('../../models/resenasModel');

describe('Resenas Controller', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {
        comentario: 'Buena reseña',
        calificacion: 5,
      },
    };

    mockResponse = {
      json: jest.fn(),
      status: jest.fn(() => mockResponse),
    };
  });

  it('should add a review successfully', () => {
    const mockInsertId = 1;

    resenasModel.agregarResena.mockImplementationOnce((comentario, calificacion, callback) => {
      callback(null, { insertId: mockInsertId });
    });

    resenasController.agregarResena(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ mensaje: 'Reseña agregada con éxito', id: mockInsertId });
  });

  it('should handle error in adding a review', () => {
    const mockError = new Error('Database error');

    resenasModel.agregarResena.mockImplementationOnce((comentario, calificacion, callback) => {
      callback(mockError, null);
    });

    resenasController.agregarResena(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error al agregar reseña' });
  });
});
