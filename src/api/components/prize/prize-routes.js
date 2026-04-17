const express = require('express');
const prizeController = require('./prize-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/prize', route);

  route.post('/', prizeController.createPrize);

  route.get('/', prizeController.getAllPrizes);

  route.delete('/:id', prizeController.deletePrize);
};
