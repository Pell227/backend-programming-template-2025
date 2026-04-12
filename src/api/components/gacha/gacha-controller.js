const gachaService = require('./gacha-service');

async function getGachaResults(request, response, next) {
  try {
    const results = await gachaService.getGachaResults(request.user.id);
    return response.status(200).json(results);
  } catch (error) {
    return next(error);
  }
}

async function createGachaResult(request, response, next) {
  try {
    const { prize, winstat, dailyundian, kuotapem } = request.body;
    const result = await gachaService.createGachaResult(
      request.user.id,
      prize,
      winstat,
      dailyundian,
      kuotapem
    );
    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getGachaResults,
  createGachaResult,
};
