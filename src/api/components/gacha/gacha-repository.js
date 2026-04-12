const { gacha } = require('../../../models/gacha-schema');

async function getGachaRessults() {
  return gacha.find({});
}

async function getuser() {
  return gacha.find({});
}

async function createGachaResult(user, prize, winstat, dailyundian, kuotapem) {
  return gacha.create({
    user,
    prize,
    winstat,
    dailyundian,
    kuotapem,
  });
}

module.exports = {
  getGachaRessults,
  getuser,
  createGachaResult,
};
