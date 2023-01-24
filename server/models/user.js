const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  highscoreSP: Number,
  highscoreMP: Number,
  MPwins: Number,
  scoreslistSP: [Number],
  scoreslistMP: [Number],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
