const gachaRepository = require('./gacha-repository');

async function drawGacha(username) {
  const rewards = await gachaRepository.getAvailableRewards();
  let selectedReward = 'Zonk';

  if (Math.random() < 0.2 && rewards.length > 0) {
    const totalDropRate = rewards.reduce(
      (sum, item) => sum + (item.droprate || 0),
      0
    );

    let remaining = Math.random() * totalDropRate;
    let chosen = null;
    rewards.find((item) => {
      remaining -= item.droprate;
      if (remaining <= 0) {
        chosen = item;
        return true;
      }
      return false;
    });

    if (chosen) {
      await gachaRepository.incrementWinnerCount(chosen.id);
      selectedReward = chosen.name;
    }
  }

  const log = await gachaRepository.createLog(username, selectedReward);
  return { reward_name: selectedReward, log };
}

async function getGachaRates() {
  const rewards = await gachaRepository.getAvailableRewards();
  const totalRemaining = rewards.reduce(
    (sum, item) => sum + (item.quota - item.winnerCount),
    0
  );
  const baseWinChance = 0.2;

  const itemRates = rewards.map((item) => {
    const remaining = item.quota - item.winnerCount;
    const relativeRate =
      totalRemaining > 0 ? (remaining / totalRemaining) * 100 : 0;
    const absoluteRate = relativeRate * baseWinChance;
    return {
      name: item.name,
      stock: remaining,
      chance_when_win: `${relativeRate.toFixed(2)}%`,
      real_chance: `${absoluteRate.toFixed(2)}%`,
    };
  });

  return {
    win_pool_chance: `${baseWinChance * 100}%`,
    zonk_chance: `${(1 - baseWinChance) * 100}%`,
    items: itemRates,
  };
}

async function getUserDailyCount(username) {
  return gachaRepository.countUserLogsToday(username);
}

async function getPrizeList() {
  return gachaRepository.getAllPrizes();
}

async function historyGacha(username) {
  const data = await gachaRepository.getHistoryByUsername(username);
  return {
    username,
    total_pulls: data.length,
    data,
  };
}

async function getPrizesWithRemainingQuota() {
  const prizes = await gachaRepository.getAllPrizes();
  return prizes.map((p) => ({
    name: p.name,
    quota: p.quota,
    winnerCount: p.winnerCount,
    remaining_quota: p.quota - p.winnerCount,
  }));
}

function maskUsername(username) {
  if (username.length <= 2) return username;
  const chars = username.split('');
  const maskCount = Math.max(
    1,
    Math.floor(chars.length * (0.5 + Math.random() * 0.25))
  );
  const positions = [];
  while (positions.length < maskCount) {
    const pos = Math.floor(Math.random() * (chars.length - 1));
    if (!positions.includes(pos)) positions.push(pos);
  }
  positions.forEach((pos) => {
    chars[pos] = '*';
  });
  return chars.join('');
}

async function getWinnersPerPrize() {
  const [prizes, winnerLogs] = await Promise.all([
    gachaRepository.getAllPrizes(),
    gachaRepository.getAllWinnerLogs(),
  ]);

  return prizes.map((prize) => {
    const winners = winnerLogs
      .filter((log) => log.reward === prize.name)
      .map((log) => maskUsername(log.username));

    return {
      prize: prize.name,
      quota: prize.quota,
      remaining_quota: prize.quota - prize.winnerCount,
      winners,
    };
  });
}

async function getWinnerStatus(username) {
  return { username };
}

module.exports = {
  drawGacha,
  getUserDailyCount,
  historyGacha,
  getPrizesWithRemainingQuota,
  getWinnersPerPrize,
  getWinnerStatus,
  getPrizeList,
  getGachaRates,
};
