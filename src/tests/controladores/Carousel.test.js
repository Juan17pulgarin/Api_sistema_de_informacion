const carouselControllers = require('../../controllers/carouselControllers');
const consultaMySQL = require('../../models/carouselModel');

jest.mock('../../models/carouselModel.js');

describe('Carousel Controllers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all comments', () => {
    const mockComentarios = [{ id: 1, comentario: 'Ejemplo 1' }, { id: 2, comentario: 'Ejemplo 2' }];
    consultaMySQL.getAllCards.mockImplementation((callback) => {
      callback(null, mockComentarios);
    });

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };

    const mockRequest = {};

    carouselControllers.getAllComentarios(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockComentarios);
  });
});
