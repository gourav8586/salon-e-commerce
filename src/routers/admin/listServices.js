const express = require("express");
const router = express.Router();
const {
  addService,
  deleteService,
  getServices,
  updateService,
} = require("../../controllers/admin/listServices");
const auth = require("../../../auth/adminauth");

// Add service
router.post("/addServices",  addService);

// Get services 
router.get("/getServices", getServices);

// Update specific service
router.put("/updateServices/:listId/:serviceId",  updateService);

// Delete specific service
router.delete("/deleteServices/:listId/:serviceId",  deleteService);

module.exports = router;
