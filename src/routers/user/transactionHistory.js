let {
  getTransactionHistory,
} = require("../../controllers/user/transactionHistory");
let express = require("express");
let router = express.Router();
let auth = require("../../../auth/userauth");
router.get("/userTransactionHistory", auth, getTransactionHistory);
module.exports = router;
