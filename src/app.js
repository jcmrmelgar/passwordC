/**
 * Password Generator Application
 */

const express = require('express');
const config = require('./config/default');
const passwordController = require('./controllers/passwordController');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.post('/api/generate', passwordController.generatePassword);
app.get('/api/options', passwordController.getOptions);

// Basic homepage
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Password Generator API</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; }
          code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
          pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        </style>
      </head>
      <body>
        <h1>Password Generator API</h1>
        <p>Use the following endpoints to generate secure passwords:</p>
        
        <h2>Generate Passwords</h2>
        <code>POST /api/generate</code>
        <p>Request body:</p>
        <pre>
{
  "length": 12,          // Password length (minimum 4)
  "uppercase": "true",   // Include uppercase letters
  "lowercase": "true",   // Include lowercase letters
  "numbers": "true",     // Include numbers
  "special": "true",     // Include special characters
  "count": 5             // Number of passwords to generate
}
        </pre>
        
        <h2>Get Options</h2>
        <code>GET /api/options</code>
        <p>Returns available password generation options and defaults.</p>
      </body>
    </html>
  `);
});

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Password Generator API running on port ${PORT}`);
});

module.exports = app;
