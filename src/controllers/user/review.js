const reviewModel = require("../../model/reviews");
const nodemailer = require("nodemailer");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or your mail service
  auth: {
    user: "developerinfo1212@gmail.com",
    pass: "cocb txob mfpk zrar", // App password
  },
});

// Add Review
exports.addReview = async (req, res) => {
  try {
    console.log("Adding a new review with files", req);
    console.log("Files received:", req.files);
    const user = req.user;
    console.log("Authenticated user:", user);

    const images = req.files ? req.files.map((file) => file.filename) : [];

    const reviewData = {
      ...req.body,
      user: user._id,
      Images: images,
    };

    const review = new reviewModel(reviewData);
    await review.save();

    // --- Send Thank You Email ---
    if (user && user.email) {
      await transporter.sendMail({
        from: "developerinfo1212@gmail.com",
        to: user.email,
        subject: "Thank you for your feedback 💖",
        html: `
          <h2>Hello ${user.name || "Customer"},</h2>
          <p>Thank you so much for sharing your review with us. We truly value your feedback and are glad to serve you!</p>
          <p>We hope to see you again soon 🌸</p>
          <br/>
          <p>Warm Regards,</p>
          <p><strong>Riva A Theme Salon</strong></p>
        `,
      });
    }

    res.status(201).json({ message: "Review added & email sent", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add review", error });
  }
};

// Get Reviews Where Toggle is True
exports.getActiveReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find({ toggle: true });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to get active reviews", error });
  }
};
