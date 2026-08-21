const app = require('./src/app');
const { port } = require('./src/config/constants');
const { initDatabase } = require('./src/config/database');

async function start() {
  let retries = 5;
  while (retries > 0) {
    try {
      await initDatabase();
      app.listen(port, () => {
        console.log(`API server running on port ${port}`);
      });
      return;
    } catch (err) {
      console.error(`DB connection failed (${retries} retries left):`, err.message);
      retries--;
      if (retries === 0) {
        console.error('Max retries reached. Exiting.');
        process.exit(1);
      }
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

start();
