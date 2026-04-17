const prizeService = require('./prize-service');

async function createPrize(request, response, next) {
  try {
    const { name, quota, droprate } = request.body;

    if (!name || quota === undefined) {
      return response
        .status(400)
        .json({ message: 'Name,Quota and droprate are required' });
    }
    const result = await prizeService.addPrize({
      name,
      quota,
      droprate,
    });
    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getAllPrizes(request, response, next) {
  try {
    const prizes = await prizeService.listPrizes();
    return response.status(200).json(prizes);
  } catch (error) {
    return next(error);
  }
}

async function deletePrize(request, response, next) {
  try {
    const { id } = request.params;
    await prizeService.removePrize(id);
    return response.status(200).json({ message: 'Prize deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createPrize,
  getAllPrizes,
  deletePrize,
};
