let { userLogin } = require("../../controllers/user/login");
let express = require("express");
let router = express.Router();

router.post("/userLogin", userLogin);

module.exports = router;
