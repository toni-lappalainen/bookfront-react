const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.options('*', cors());

// MIDDLEWARE
app.use(express.json());

// ROUTERS
const bookRouter = require('./bookRoutes');

app.use('/api/v1/books', bookRouter);

module.exports = app;
