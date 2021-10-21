'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Middleware
const accessControl = require('./middleware/acl.js');
const basicAuth = require('./middleware/basic.js');
const bearerAuth = require('./middleware/bearer.js');
const logger = require('./middleware/logger.js');

// Error Handlers
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

// Routes
const v1Routes = require('./routes/v1.js');
const authRouter = require('./routes/routes.js');

// Express
const app = express();

// Using all the middleware
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// Routes
app.use('/api/v1', v1Routes);
//app.use('/auth/', authRouter);
//app.use()


// Use error handlers
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing your Port, Cap\'n'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
