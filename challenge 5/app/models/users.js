const pool = require('../../config/db');
const getUser = async (limit, page) => {
  const result = await pool.query('SELECT * FROM users LIMIT $1 OFFSET $2', [
    limit,
    (page - 1) * limit,
  ]);
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows;
};

const deleteUser = async (id) => {
  const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  return result.rows;
};

const createUser = async (name, password) => {
  const result = await pool.query(
    'INSERT INTO users (name,password) VALUES ($1,$2) RETURNING *',
    [name, password]
  );
  return result.rows;
};

const updateUser = async (id, name) => {
  const result = await pool.query(
    'UPDATE users SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return result.rows;
};

module.exports = {
  getUser,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
};
