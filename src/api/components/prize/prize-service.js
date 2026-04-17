const prizeRepository = require('./prize-repository');

async function addPrize(payload) {
  return prizeRepository.insertPrize(payload);
}

async function listPrizes() {
  return prizeRepository.findAllPrizes();
}

async function removePrize(id) {
  return prizeRepository.deletePrizeById(id);
}

module.exports = {
  addPrize,
  listPrizes,
  removePrize,
};
