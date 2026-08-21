const app = require('./src/app');
const { port } = require('./src/config/constants');
const { initDatabase } = require('./src/config/database');

// Start the server IMMEDIATELY so Railway sees it's alive
const server = app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

// Initialize DB in the background
(async () => {
  let retries = 10;
  while (retries > 0) {
    try {
      await initDatabase();
      console.log('Database initialized successfully');
      return;
    } catch (err) {
      console.error(`DB connection failed (${retries} retries left):`, err.message);
      retries--;
      if (retries === 0) {
        console.error('Max retries reached. DB not available, but server is running.');
        return;
      }
      await new Promise(r => setTimeout(r, 5000));
    }
  }
})();
