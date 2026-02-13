const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String },
  Timestamp: { type: Date, default: Date.now },
});

const brandModel = mongoose.model("brand", brandSchema);
module.exports = brandModel;
