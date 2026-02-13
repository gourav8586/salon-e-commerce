let { addReview, getActiveReviews } = require("../../controllers/user/review");
let express = require("express");
let router = express.Router();
let auth = require("../../../auth/userauth");
let multer = require("multer");
let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/reviews");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});

router.post("/addUserReview", auth, upload.array("Images", 5), addReview);
router.get("/getUserActiveReviews", getActiveReviews);

module.exports = router;
