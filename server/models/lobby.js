const mongoose = require("mongoose");

const LobbySchema = new mongoose.Schema({
  content: String,
});

// compile model from schema
module.exports = mongoose.model("lobby", LobbySchema);
