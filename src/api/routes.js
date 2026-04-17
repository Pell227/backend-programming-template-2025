const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const gacha = require('./components/gacha/gacha-routes');
const prize = require('./components/prize/prize-routes');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  gacha(app);
  prize(app);

  return app;
};
