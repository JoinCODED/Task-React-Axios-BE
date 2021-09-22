const express = require('express');
const port = 8000;
const path = require('path');
const cors = require('cors');

const app = express();
const tasksRoutes = require('./routes/tasks');

app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', tasksRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json(err.message ?? { message: 'Internal Server Error.!' });
});
app.listen(process.env.PORT || 5000);
