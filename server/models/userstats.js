const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  id: String,
  highscoreSP: Number,
  highscoreMP: Number,
  MPwins: Number,
});

// compile model from schema
module.exports = mongoose.model("userstats", UserSchema);
