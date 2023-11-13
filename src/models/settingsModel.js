const mysql = require("mysql");

// Configura la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const consultaMySQL = {
  getUserSettings: (userId, callback) => {
    pool.query("SELECT * FROM users WHERE id = ?", [userId], callback);
  },

  updateUserSettings: (userId, updatedSettings, callback) => {
    pool.query(
      "UPDATE users SET ? WHERE id = ?",
      [updatedSettings, userId],
      callback
    );
  },
};

module.exports = consultaMySQL;
