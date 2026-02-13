let {
userRegister
} = require("../../controllers/user/register");
let express = require("express");
let router = express.Router();

router.post("/userRegister", userRegister);
module.exports = router;
