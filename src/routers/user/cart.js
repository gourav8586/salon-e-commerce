const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} = require("../../controllers/user/cart");
const auth = require("../../../auth/userauth");

router.post("/addCart", auth, addToCart);
router.put("/updateCart", auth, updateQuantity);
router.delete("/removeCart", auth, removeFromCart);
router.get("/getCart/:userId", auth, getCart);

module.exports = router;
