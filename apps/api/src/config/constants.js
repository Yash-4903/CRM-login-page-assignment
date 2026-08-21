require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT, 10) || 5000,
  db: {
    host: process.env.MYSQLHOST || 'localhost',
    port: parseInt(process.env.MYSQLPORT, 10) || 3306,
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || 'crm_auth',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_super_secret_jwt_key_minimum_32_characters_long',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12,
  },
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};