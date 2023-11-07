const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const loginModel = {
  consultaUser: (username, password, callback) => {
    const query = 'SELECT * FROM usuarios WHERE nombre = ? AND contrasenna = ? AND estado = 1';
    const values = [username, password];

    pool.query(query, values, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        if (results.length === 0) {
          callback(null, null);
        } else {
          callback(null, results[0]);
        }
      }
    });
  },
};


module.exports = loginModel;
