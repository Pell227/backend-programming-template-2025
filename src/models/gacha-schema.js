module.exports = (db) =>
  db.model(
    'gacha',
    db.Schema({
      user: String,
      prize: String,
      winstat: Boolean,
      dailyundian: Number,
      kuotapem: Number,
    })
  );
