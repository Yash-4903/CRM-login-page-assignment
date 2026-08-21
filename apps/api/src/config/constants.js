require('dotenv').config();

const PORT = process.env.PORT || 8080;
const CLIENT_PORT = process.env.CLIENT_PORT || 5173;

module.exports = {
  port: parseInt(PORT, 10) || 8080,
  db: {
    host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
    port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT, 10) || 3306,
    user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || 'crm_auth',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_super_secret_jwt_key_minimum_32_characters_long',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12,
  },
  clientUrl: process.env.CLIENT_URL || `http://localhost:${CLIENT_PORT}`,
};