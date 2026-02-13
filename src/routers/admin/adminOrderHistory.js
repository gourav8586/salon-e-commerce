const {
  adminGetOrderDetails,
  adminGetOrderHistory,
} = require("../../controllers/admin/adminOrderHistory");
const express = require("express");
const router = express.Router();
const auth = require("../../../auth/adminauth");

// =============== GET ORDER HISTORY ===============

router.get("/adminGetOrderHistory", auth, adminGetOrderHistory);
router.get("/adminGetOrderDetails/:orderId", auth, adminGetOrderDetails);

module.exports = router;
