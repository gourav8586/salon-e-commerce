const mongoose = require("mongoose");

const offerAndPackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // e.g., "Bridal Package" or "Festive Offer"
  },

  description: {
    type: String,
  },

  services: [{ type: mongoose.Schema.Types.ObjectId }],

  packagePrice: {
    type: Number, // total discounted package price
    required: true,
  },

  validFrom: {
    type: Date,
    default: Date.now,
  },

  validTo: {
    type: Date,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const offerAndPackageModel = mongoose.model(
  "offerAndPackage",
  offerAndPackageSchema
);
module.exports = offerAndPackageModel;
