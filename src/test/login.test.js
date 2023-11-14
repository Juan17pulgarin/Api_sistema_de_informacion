const loginController = require('../controllers/loginControllers');
const loginModel = require('../models/loginModel');

jest.mock('../../models/loginModel');

describe('Login Controller', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {
        username: 'testuser',
        password: 'testpassword',
      },
    };

    mockResponse = {
      json: jest.fn(),
      status: jest.fn(() => mockResponse),
    };
  });

  it('should authenticate user successfully', () => {
    const mockUser = {
      username: 'testuser',
      contrasenna: 'testpassword',
    };

    loginModel.consultaUser.mockImplementationOnce((username, password, callback) => {
      callback(null, mockUser);
    });

    loginController.comprobarUsuario(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ mensaje: 'Usuario autenticado' });
  });

  it('should handle user not found', () => {
    loginModel.consultaUser.mockImplementationOnce((username, password, callback) => {
      callback(null, null);
    });

    loginController.comprobarUsuario(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Usuario no encontrado' });
  });

  it('should handle incorrect password', () => {
    const mockUser = {
      username: 'testuser',
      contrasenna: 'correctpassword',
    };

    loginModel.consultaUser.mockImplementationOnce((username, password, callback) => {
      callback(null, mockUser);
    });

    loginController.comprobarUsuario(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Contraseña incorrecta' });
  });

  it('should handle database error', () => {
    const mockError = new Error('Database error');

    loginModel.consultaUser.mockImplementationOnce((username, password, callback) => {
      callback(mockError, null);
    });

    loginController.comprobarUsuario(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error al consultar usuario' });
  });
});
