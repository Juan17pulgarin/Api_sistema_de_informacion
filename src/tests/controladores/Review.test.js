const ComentarioController = require('../../controllers/reviewController');
const consultaMySQL = require('../../models/reviewModel');

jest.mock('../../models/reviewModel');

describe('Comentario Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all comments', () => {
    const mockComentarios = [{ id: 1, comentario: 'Ejemplo 1' }, { id: 2, comentario: 'Ejemplo 2' }];
    consultaMySQL.getAllResennas.mockImplementation((callback) => {
      callback(null, mockComentarios);
    });

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };

    const mockRequest = {};

    ComentarioController.getAllComentarios(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockComentarios);
  });

});
