const express = require("express");
const router = express.Router();
const {
  createRazorpayOrder,
  verifyAndPlaceOrder,
  cancelOrderAndRefund,
} = require("../../controllers/user/buyProduct");
const auth = require("../../../auth/userauth");
router.post("/createRazorpayOrder", auth, createRazorpayOrder);
router.post("/verifyAndPlaceOrder", auth, verifyAndPlaceOrder);
router.post("/cancel-order", auth, cancelOrderAndRefund);
module.exports = router;
