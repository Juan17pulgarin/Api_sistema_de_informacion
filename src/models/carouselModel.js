const mysql = require('mysql');

// Configura la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE, 
});

const consultaMySQL = {
    getAllCards: (callback) => {
      pool.query('SELECT * FROM residuos', callback);
    },
  
    getCardsById: (id, callback) => {
      pool.query('SELECT * FROM residuos WHERE id = ?', [id], callback);
    },
  
    createCards: (newResenna, callback) => {
      pool.query('INSERT INTO residuos SET ?', newResenna, callback);
    },
  
    updateCards: (id, updatedResenna, callback) => {
      pool.query('UPDATE residuos SET ? WHERE id = ?', [updatedResenna, id], callback);
    },
  
    deleteCards: (id, callback) => {
      pool.query('DELETE FROM residuos WHERE id = ?', [id], callback);
    },
  };

  
module.exports = consultaMySQL;