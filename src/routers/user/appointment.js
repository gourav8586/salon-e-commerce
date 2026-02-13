const express = require("express");
const router = express.Router();
const {
  addAppointment,
  getAppointments,
} = require("../../controllers/user/appointment");
const auth = require("../../../auth/userauth");

router.post("/add-appointment", auth, addAppointment);
router.get("/get-appointments", auth, getAppointments);

module.exports = router;
