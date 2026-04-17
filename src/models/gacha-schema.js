module.exports = (db) =>
  db.model(
    'gacha',
    db.Schema({
      username: {
        type: String,
        require: true,
      },
      reward: {
        type: String,
        default: 'Zonk',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: Boolean,
        require: true,
      },
      daily: {
        type: Number,
        maxlength: 5,
      },
    })
  );
