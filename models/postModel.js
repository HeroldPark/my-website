const db = require('../db');

async function getAllPosts() {
  const [rows] = await db.query('SELECT * FROM posts');
  return rows;
}

async function getPostById(id) {
  const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
  return rows[0];
}

async function createPost(title, content, userId) {
  const result = await db.query('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId]);
  return result[0].insertId;
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
};
