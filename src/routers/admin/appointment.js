const express = require("express");
const router = express.Router();
const {
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} = require("../../controllers/admin/appointment");
const auth = require("../../../auth/adminauth");

router.get("/adminGet-appointments", auth, getAppointments);
router.patch("/adminUpdate-appointment-status", auth, updateAppointmentStatus);
router.delete("/adminDelete-appointment", auth, deleteAppointment);

module.exports = router;
