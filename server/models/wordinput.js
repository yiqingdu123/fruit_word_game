const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  word: String,
  length: Number,
  validword: Boolean,
});

// compile model from schema
module.exports = mongoose.model("wordinput", UserSchema);
