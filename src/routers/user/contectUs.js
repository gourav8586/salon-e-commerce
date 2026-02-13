let express = require("express");
const { addContactUs } = require("../../controllers/user/contectUs");
let router = express.Router();

router.post("/addContactUs", addContactUs);

module.exports = router;
