let {
  deleteReview,
  getActiveReviews,
  getAllReviews,
  updateReview,
} = require("../../controllers/admin/review");
let express = require("express");
let router = express.Router();


router.get("/getActiveReviews", getActiveReviews);
router.get("/getAllReviews", getAllReviews);
router.patch("/updateReview/:id", updateReview);
router.delete("/deleteReview/:id", deleteReview);

module.exports = router;
