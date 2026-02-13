let express = require("express");
let router = express.Router();
const {
Sign_Out
} = require("../../controllers/user/sign_out");

router.post("/userSignOut", Sign_Out);

module.exports = router;
