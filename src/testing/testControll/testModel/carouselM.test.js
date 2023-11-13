const consultaMySQL = require('./consultaMySQL');

// Mock del módulo mysql para simular las funciones
jest.mock('mysql');

describe('consultaMySQL Functions', () => {
  it('should construct SELECT query for getAllCards', () => {
    const callback = jest.fn();

    consultaMySQL.getAllCards(callback);

    // Verifica que la función query se llame con la consulta SQL correcta
    expect(consultaMySQL.pool.query).toHaveBeenCalledWith('SELECT * FROM residuos', callback);
  });

  it('should construct SELECT query for getCardsById', () => {
    const callback = jest.fn();
    const id = 1;

    consultaMySQL.getCardsById(id, callback);

    // Verifica que la función query se llame con la consulta SQL correcta y el ID adecuado
    expect(consultaMySQL.pool.query).toHaveBeenCalledWith('SELECT * FROM residuos WHERE id = ?', [id], callback);
  });

  it('should construct INSERT query for createCards', () => {
    const callback = jest.fn();
    const newResenna = { /* datos de la nueva tarjeta */ };

    consultaMySQL.createCards(newResenna, callback);

    // Verifica que la función query se llame con la consulta SQL correcta y los datos adecuados
    expect(consultaMySQL.pool.query).toHaveBeenCalledWith('INSERT INTO residuos SET ?', newResenna, callback);
  });

  it('should construct UPDATE query for updateCards', () => {
    const callback = jest.fn();
    const id = 1;
    const updatedResenna = { /* datos actualizados */ };

    consultaMySQL.updateCards(id, updatedResenna, callback);

    // Verifica que la función query se llame con la consulta SQL correcta, los datos actualizados y el ID adecuado
    expect(consultaMySQL.pool.query).toHaveBeenCalledWith('UPDATE residuos SET ? WHERE id = ?', [updatedResenna, id], callback);
  });

  it('should construct DELETE query for deleteCards', () => {
    const callback = jest.fn();
    const id = 1;

    consultaMySQL.deleteCards(id, callback);

    // Verifica que la función query se llame con la consulta SQL correcta y el ID adecuado
    expect(consultaMySQL.pool.query).toHaveBeenCalledWith('DELETE FROM residuos WHERE id = ?', [id], callback);
  });
});
