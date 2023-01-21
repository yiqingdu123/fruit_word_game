const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  content: String,
});

// compile model from schema
module.exports = mongoose.model("word", UserSchema);
