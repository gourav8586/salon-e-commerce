const express = require("express");
const router = express.Router();
const {
  getOrderDetails,
  getOrderHistory,
} = require("../../controllers/user/orderHistory");

router.get("/getOrderHistory", getOrderHistory);
router.get("/getOrderDetails/:orderId", getOrderDetails);

module.exports = router;
