import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5173;
const port = parseInt(PORT, 10) || 5173;

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback: all requests go to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Frontend server running on http://localhost:${port}`);
});
