const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userId: {
    type: String,
  },
  selectService: {
    type: String,
  },
  rating: {
    type: Number,
  },
  description: { type: String },
  Images: [String],
  toggle: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const reviewModel = mongoose.model("review", reviewSchema);
module.exports = reviewModel;
