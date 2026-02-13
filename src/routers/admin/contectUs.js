let express = require("express");
const {
  deleteContactUs,
  getContactUs,
  updateContactUsStatus,
} = require("../../controllers/admin/contectUs");
let router = express.Router();


router.get("/getContectUs", getContactUs);
router.patch("/contectUs/:id", updateContactUsStatus);
router.delete("/deleteContectUs/:id", deleteContactUs);

module.exports = router;
