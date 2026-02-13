// const mongoose = require("mongoose");

// const bannerSchema = new mongoose.Schema({
//   image: [String],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const bannerModel = mongoose.model("bannerImage", bannerSchema);
// module.exports = bannerModel;



const mongoose = require("mongoose");

const bannerItemSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  paragraph: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  buttontext: {
    type: String,
    default: "",
  },
});

const bannerSchema = new mongoose.Schema({
  banners: [bannerItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const bannerModel = mongoose.model("bannerImage", bannerSchema);
module.exports = bannerModel;
