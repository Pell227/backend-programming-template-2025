const gachaRepository = require('./gacha-repository');

async function getGachaRessults() {
  return gachaRepository.getGachaRessults();
}

async function getuser() {
  return gachaRepository.getuser();
}

async function createGachaResult(user, prize, winstat, dailyundian, kuotapem) {
  return gachaRepository.createGachaResult(
    user,
    prize,
    winstat,
    dailyundian,
    kuotapem
  );
}

module.exports = {
  getGachaRessults,
  getuser,
  createGachaResult,
};
