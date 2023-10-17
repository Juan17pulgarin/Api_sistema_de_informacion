const mysql = require('mysql');

// Configura la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE, 
});

const consultaMySQL = {
    getAllResennas: (callback) => {
      pool.query('SELECT * FROM resennas', callback);
    },
  
    getResennaById: (id, callback) => {
      pool.query('SELECT * FROM resennas WHERE id = ?', [id], callback);
    },
  
    createResenna: (newResenna, callback) => {
      pool.query('INSERT INTO resennas SET ?', newResenna, callback);
    },
  
    updateResenna: (id, updatedResenna, callback) => {
      pool.query('UPDATE resennas SET ? WHERE id = ?', [updatedResenna, id], callback);
    },
  
    deleteResenna: (id, callback) => {
      pool.query('DELETE FROM resennas WHERE id = ?', [id], callback);
    },
  };

  
module.exports = consultaMySQL;