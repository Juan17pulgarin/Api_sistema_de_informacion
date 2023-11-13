const ComentarioController = require('../../controllers/reviewController');
const consultaMySQL = require('../../models/reviewModel');

jest.mock('../../models/reviewModel');

describe('Comentario Controller', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: { id: 1 },
    };

    mockResponse = {
      json: jest.fn(),
      status: jest.fn(() => mockResponse),
    };
  });

  it('should get all comments successfully', () => {
    const mockComentarios = [{ id: 1, comentario: 'Great!' }];

    consultaMySQL.getAllResennas.mockImplementationOnce((callback) => {
      callback(null, mockComentarios);
    });

    ComentarioController.getAllComentarios(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockComentarios);
  });

  it('should get a comment by ID successfully', () => {
    const mockComentario = { id: 1, comentario: 'Great!' };

    consultaMySQL.getResennaById.mockImplementationOnce((id, callback) => {
      callback(null, mockComentario);
    });

    ComentarioController.getComentarioById(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockComentario);
  });

  it('should create a comment successfully', () => {
    const mockResultado = { insertId: 1 };

    consultaMySQL.createResenna.mockImplementationOnce((newComentario, callback) => {
      callback(null, mockResultado);
    });

    ComentarioController.createComentario(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ mensaje: 'Comentario creado con éxito', id: mockResultado.insertId });
  });

  it('should update a comment successfully', () => {
    consultaMySQL.updateResenna.mockImplementationOnce((id, updatedComentario, callback) => {
      callback(null);
    });

    ComentarioController.updateComentario(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({ mensaje: 'Comentario actualizado con éxito' });
  });

  it('should delete a comment successfully', () => {
    consultaMySQL.deleteResenna.mockImplementationOnce((id, callback) => {
      callback(null);
    });

    ComentarioController.deleteComentario(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({ mensaje: 'Comentario eliminado con éxito' });
  });

});
