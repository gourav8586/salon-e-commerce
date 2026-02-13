const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "galleryCategory",
  },

  images: [String],
  videosUrl: [String],
  createdAt: { type: Date, default: Date.now },
});

const galleryModel = mongoose.model("Gallery", gallerySchema);
module.exports = galleryModel;
