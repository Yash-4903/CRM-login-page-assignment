const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const { db, bcrypt: bcryptConfig } = require('./constants');

const pool = mysql.createPool({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const TEST_USER = {
  name: 'Test CRM User',
  email: 'testcrm@example.com',
  phone: '9876543210',
  password: 'Test@12345',
};

async function initDatabase() {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    await seedTestUser();
  } finally {
    connection.release();
  }
}

async function seedTestUser() {
  const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [TEST_USER.email]);
  if (rows.length === 0) {
    const hashed = await bcrypt.hash(TEST_USER.password, bcryptConfig.saltRounds);
    await pool.query(
      'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
      [TEST_USER.name, TEST_USER.email, TEST_USER.phone, hashed]
    );
    console.log('Test user seeded:', TEST_USER.email);
  }
}

module.exports = { pool, initDatabase };