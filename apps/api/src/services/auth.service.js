const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
const { jwt: jwtConfig, bcrypt: bcryptConfig } = require('../config/constants');

function createHttpError(statusCode, message, errors = {}) {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.responded = true;
  err.errors = errors;
  return err;
}

async function registerUser({ name, email, phone, password }) {
  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    throw createHttpError(409, 'Email already registered', { email: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, bcryptConfig.saltRounds);

  const [result] = await pool.query(
    'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
    [name, email, phone, hashedPassword]
  );

  const [rows] = await pool.query(
    'SELECT id, name, email, phone, created_at FROM users WHERE id = ?',
    [result.insertId]
  );

  return rows[0];
}

async function loginUser({ email, password }) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

  if (rows.length === 0) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const user = rows[0];
  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
  };
}

async function getUserById(userId) {
  const [rows] = await pool.query(
    'SELECT id, name, email, phone, created_at FROM users WHERE id = ?',
    [userId]
  );

  if (rows.length === 0) {
    throw createHttpError(401, 'Unauthorized — invalid or expired token');
  }

  return rows[0];
}

module.exports = { registerUser, loginUser, getUserById };