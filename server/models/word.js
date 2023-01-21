const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  content: String,
  length: Number,
  validword: Boolean,
});

// compile model from schema
module.exports = mongoose.model("word", UserSchema);
