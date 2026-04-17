const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function playGacha(request, response, next) {
  try {
    const { username } = request.body;

    if (!username) {
      return response.status(400).json({ error: 'Username Wajib diisi!' });
    }

    const dailyCount = await gachaService.getUserDailyCount(username);
    if (dailyCount >= 5) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Batas gacha harian (5x) telah tercapai'
      );
    }

    const result = await gachaService.drawGacha(username);

    return response.status(200).json({
      message:
        result.reward_name !== 'Zonk'
          ? `Selamat! anda telah memenangkan ${result.reward_name}!`
          : 'Maaf anda belum menang..',
      reward: result.reward_name,
    });
  } catch (error) {
    return next(error);
  }
}

async function historygacha(request, response, next) {
  try {
    const { username } = request.params;

    if (!username) {
      return response.status(400).json({ error: 'Username is required' });
    }

    const result = await gachaService.historyGacha(username);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function listPrizes(request, response, next) {
  try {
    const prizes = await gachaService.getPrizeList();
    return response.status(200).json({ success: true, data: prizes });
  } catch (error) {
    return next(error);
  }
}

async function getPrizesWithRemainingQuota(request, response, next) {
  try {
    const data = await gachaService.getPrizesWithRemainingQuota();
    return response.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
}

async function getWinners(request, response, next) {
  try {
    const data = await gachaService.getWinnersPerPrize();
    return response.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
}

async function winnerstatus(request, response, next) {
  try {
    const { username } = request.params;

    if (!username) {
      return response
        .status(400)
        .json({ success: false, message: 'Username is required' });
    }

    const winner = await gachaService.getWinnerStatus(username);
    return response.status(200).json({
      username: winner.username.replace(/.(?=.{2})/g, '*'),
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  playGacha,
  getWinners,
  historygacha,
  winnerstatus,
  listPrizes,
  getPrizesWithRemainingQuota,
};
