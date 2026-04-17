const express = require('express');
const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/play', gachaController.playGacha);

  route.get('/history/:username', gachaController.historygacha);

  route.get('/status/:username', gachaController.winnerstatus);

  route.get('/prizes/quota', gachaController.getPrizesWithRemainingQuota);

  route.get('/winners', gachaController.getWinners);
};
