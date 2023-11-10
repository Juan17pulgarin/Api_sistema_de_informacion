const SettingsController = require('../../controllers/settingsContoller');
const consultaMySQL = require('../../models/settingsModel');

jest.mock('../../models/settingsModel');

describe('Settings Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get user settings', () => {
    const mockSettings = { id: 1, userId: 123, theme: 'dark' };
    consultaMySQL.getUserSettings.mockImplementation((userId, callback) => {
      if (userId === 123) {
        callback(null, mockSettings);
      } else {
        callback(new Error('User not found'));
      }
    });

    const mockRequest = { params: { id: 123 } };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };

    SettingsController.getUserSettings(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockSettings);
  });

  it('should update user settings', () => {
    const userId = 123;
    const updatedSettings = { theme: 'light' };
    consultaMySQL.updateUserSettings.mockImplementation((userId, settings, callback) => {
      if (userId === 123) {
        callback(null);
      } else {
        callback(new Error('User not found'));
      }
    });

    const mockRequest = { params: { id: userId }, body: updatedSettings };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };

    SettingsController.updateUserSettings(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({ mensaje: 'Configuración del usuario actualizada con éxito' });
  });
});
