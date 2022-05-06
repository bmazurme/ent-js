const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const users = require('./routes/users');

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  PORT = 3000 
} = process.env;

const {
  ERROR_NOT_FOUND_CODE,
} = require('./utils/constants');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {useNewUrlParser: true});

app.use((req, res, next) => {
  req.user = {
    _id: '6268496fe215d02525baacfa',
  };

  next();
});
app.use('/', users);
app.use((req, res) => {
  res.status(ERROR_NOT_FOUND_CODE).json({ message: 'страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});