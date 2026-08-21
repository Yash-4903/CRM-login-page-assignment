const app = require('./src/app');
const { port } = require('./src/config/constants');
const { initDatabase } = require('./src/config/database');

async function start() {
  try {
    await initDatabase();
    app.listen(port, () => {
      console.log(`API server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to initialize database:', err.message);
    process.exit(1);
  }
}

start();