const carouselControllers = require('../controllers/carouselControllers');
const consultaMySQL = require('../models/carouselModel');

jest.mock('../models/carouselModel'); 

describe('Carousel Controller', () => {
  describe('getAllComentarios', () => {
    it('should get all comments', () => {
      const mockComentarios = [{ comment: 'Test comment 1' }, { comment: 'Test comment 2' }];

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn(() => mockResponse),
      };

      consultaMySQL.getAllCards.mockImplementationOnce((callback) => {
        callback(null, mockComentarios);
      });

      carouselControllers.getAllComentarios({}, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith(mockComentarios);
    });

    it('should handle error while getting comments', () => {
      const mockError = new Error('Database error');

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn(() => mockResponse),
      };

      consultaMySQL.getAllCards.mockImplementationOnce((callback) => {
        callback(mockError, null);
      });

      carouselControllers.getAllComentarios({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error al obtener tarjeta' });
    });
  });
  
});
