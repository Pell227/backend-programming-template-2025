const { Reward } = require('../../../models');

async function insertPrize(data) {
  return Reward.create({
    name: data.name,
    quota: Number(data.quota),
    droprate: Number(data.droprate),
  });
}

async function findAllPrizes() {
  return Reward.find({});
}

async function deletePrizeById(id) {
  return Reward.findByIdAndDelete(id);
}

module.exports = {
  insertPrize,
  findAllPrizes,
  deletePrizeById,
};
