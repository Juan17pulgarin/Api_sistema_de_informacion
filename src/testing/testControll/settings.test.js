const SettingsController = require('../../controllers/settingsContoller');
const consultaMySQL = require('../../models/settingsModel');

jest.mock('../../models/settingsModel');

describe('Settings Controller', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      params: { id: 1 }, 
      body: {},
    };

    mockResponse = {
      json: jest.fn(),
      status: jest.fn(() => mockResponse),
    };
  });

  it('should get user settings successfully', () => {
    const mockSettings = { id: 1, userId: 1, setting: 'value' };

    consultaMySQL.getUserSettings.mockImplementationOnce((userId, callback) => {
      callback(null, mockSettings);
    });

    SettingsController.getUserSettings(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockSettings);
  });

  it('should update user settings successfully', () => {
    consultaMySQL.updateUserSettings.mockImplementationOnce((userId, updatedSettings, callback) => {
      callback(null);
    });

    SettingsController.updateUserSettings(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({ mensaje: 'Configuración del usuario actualizada con éxito' });
  });

  it('should handle error in getting user settings', () => {
    const mockError = new Error('Database error');

    consultaMySQL.getUserSettings.mockImplementationOnce((userId, callback) => {
      callback(mockError, null);
    });

    SettingsController.getUserSettings(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error al obtener la configuración del usuario' });
  });

  it('should handle error in updating user settings', () => {
    const mockError = new Error('Database error');

    consultaMySQL.updateUserSettings.mockImplementationOnce((userId, updatedSettings, callback) => {
      callback(mockError);
    });

    SettingsController.updateUserSettings(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error al actualizar la configuración del usuario' });
  });
});
