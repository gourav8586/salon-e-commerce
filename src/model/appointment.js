const mongoose = require("mongoose");
const { use } = require("passport");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },  
  customerName: { type: String },
  email: { type: String },
  phone: { type: String },
  appointmentDate: { type: Date },
  appointmentTime: { type: String },
  status: {
    type: String,
    enum: ["New", "Confirmed", "Completed", "Cancelled"],
    default: "New",
  },
  category: { type: String },
  services: [{ type: String }],

  createdAt: { type: Date, default: Date.now },
});

const appointmentModel = mongoose.model("appointment", appointmentSchema);
module.exports = appointmentModel;
