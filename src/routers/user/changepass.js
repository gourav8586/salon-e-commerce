let express = require("express");
const { change_pass } = require("../../controllers/user/changepass");
let router = express.Router();
let auth = require("../../../auth/userauth");

router.put("/userChange_Pass", auth, change_pass);

module.exports = router;
