const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  id: String,
  score: Number,
  lives: Number,
});

// compile model from schema
module.exports = mongoose.model("gamestats", UserSchema);
