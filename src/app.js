const cors = require('cors');
const express = require('express');

const usersRouter = require('./routes/users.routes');
const repairsRouter = require('./routes/repairs.routes');

const app = express();

app.use(express.json());
app.use(cors());

// Enpoint de user
app.use('/api/v1/users', usersRouter);

// Endpoint de repair
app.use('/api/v1/repairs', repairsRouter);

module.exports = app;
