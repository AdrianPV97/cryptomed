const promisePool = require('../config/db');
const bcrypt = require('bcrypt');


const createUser = async (fname, lname, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [rows] = await promisePool.query('CALL crear_paciente(?, ?, ?)', [fname, lname, hashedPassword]);
  return rows.insertId;
};

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

module.exports = { createUser, findUserByUsername };
