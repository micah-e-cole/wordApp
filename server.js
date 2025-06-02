const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Only fallback to index.html for requests that don't look like files
app.get('*', (req, res) => {
  if (req.path.includes('.') || req.path.startsWith('/static')) {
    // Let 404 happen naturally if file doesn't exist
    return res.status(404).send('Not Found');
  }

  const indexPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath, err => {
    if (err) {
      console.error('❌ Error sending index.html:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(`✅ Served index.html for ${req.url}`);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
