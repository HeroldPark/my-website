const db = require('../db');

async function getUserByUsernameAndPassword(username, password) {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
  return rows[0];
}

async function createUser(username, password) {
  const result = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
  return result[0].insertId;
}

module.exports = {
  getUserByUsernameAndPassword,
  createUser,
};
