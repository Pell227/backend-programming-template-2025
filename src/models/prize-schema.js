module.exports = (db) =>
  db.model(
    'Reward',
    db.Schema({
      name: {
        type: String,
        required: true,
      },
      quota: {
        type: Number,
        required: true,
      },
      winnerCount: {
        type: Number,
        default: 0,
      },
      droprate: {
        type: Number,
        require: true,
      },
    })
  );
