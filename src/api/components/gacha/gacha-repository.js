const { gacha, Reward } = require('../../../models');

async function countUserLogsToday(username) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return gacha.countDocuments({
    username,
    createdAt: { $gte: start, $lte: end },
  });
}

async function getAvailableRewards() {
  return Reward.find({ $expr: { $lt: ['$winnerCount', '$quota'] } });
}

async function getAllPrizes() {
  return Reward.find({});
}

async function getHistoryByUsername(username) {
  return gacha
    .find({ username })
    .sort({ createdAt: -1 })
    .select('username reward createdAt -_id');
}

async function getAllWinnerLogs() {
  return gacha.find({ reward: { $ne: 'Zonk' } }).select('username reward -_id');
}

async function createLog(username, rewardName) {
  return gacha.create({ username, reward: rewardName });
}

async function incrementWinnerCount(rewardId) {
  return Reward.findByIdAndUpdate(rewardId, { $inc: { winnerCount: 1 } });
}

module.exports = {
  countUserLogsToday,
  getAvailableRewards,
  getAllPrizes,
  getHistoryByUsername,
  getAllWinnerLogs,
  createLog,
  incrementWinnerCount,
};
