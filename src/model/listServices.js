const mongoose = require("mongoose");

const serviceListSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "serviceCategory",
  },

  services: [
    {
      genderType: {
        type: String,
      },
      name: { type: String }, // e.g., "Hair Cut"
      regularPrice: { type: Number }, // e.g., 500
      offerPrice: { type: Number, default: null }, // e.g., 400
      priceToggle: { type: Boolean, default: false }, // if true, price is show
      isPopular: { type: Boolean, default: false }, // highlight popular services
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

const serviceListModel = mongoose.model("serviceList", serviceListSchema);
module.exports = serviceListModel;
