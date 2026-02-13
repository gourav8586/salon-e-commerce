let {
  getTransactionHistory,
} = require("../../controllers/admin/transaction");
let express = require("express");
let router = express.Router();
let auth = require("../../../auth/adminauth");
router.get("/adminGetTransaction", auth, getTransactionHistory);
module.exports = router;
