const debug = require('debug')('purisima:startup');
const config = require('config');
const express = require('express');
const db = require('./startup/db');

const login = require('./routes/login');
const cors = require('cors');
const helmet = require('helmet');
//const morgan = require('morgan');

const app = express();

if (!config.get("jwtPrivateKey")) {
  debug("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

//app.use(logger);
app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});
app.use(cors());
app.use(helmet());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use('/login', login);

const port = process.env.PORT || 4000;

// Test database connection before starting server
async function startServer() {
  try {
    // Test database connection
    await db.testConnection();
    debug('Database connection successful');
    
    // Start Express server only if DB connection succeeds
    app.listen(port, () => {
      debug(`Server listening on port ${port}`);
      console.log(`Server running on http://localhost:${port}`);
    });
    
  } catch (error) {
    console.error('FATAL ERROR: Could not connect to database');
    console.error(`Error details: ${error.message}`);
    process.exit(1);
  }
}

// Start the server
startServer();