let {
  change_pass,
  otpVerify,
  otp_Send,
} = require("../../controllers/user/forgetPass");
let express = require("express");
let router = express.Router();

router.post("/userSend_otp", otp_Send);
router.post("/userVerify", otpVerify);
router.post("/userChangePass", change_pass);

module.exports = router;
