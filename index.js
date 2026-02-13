const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./db/dbconnection");
dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve Static Files
app.use(express.static(path.join(__dirname, "/public")));
app.use("/uploads", express.static("public/uploads"));
app.use("/gallery", express.static("public/gallery"));
app.use("/gallery/videos", express.static("public/gallery/videos"));
app.use("/gallery/images", express.static("public/gallery/images"));

// Connect to Database
connectDB();

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Import and Use Routes for admin
const adminRoutes = [
  "admin_login",
  "admin_profile",
  "adminOrderHistory",
  "appointment",
  "bannerImage",
  "blog",
  "brands",
  "changepass",
  "contectUs",
  "diagnoseSystem",
  "forgetPass",
  "gallery",
  "galleryCategory",
  "listServices",
  "offerAndPackage",
  "product",
  "productCategory",
  "register",
  "review",
  "serviceCategory",
  "sign_out",
  "transaction",
  "viewUsers",
];
// Import and Use Routes for Users
const userRoutes = [
  "appointment",
  "buyProduct",
  "cart",
  "changepass",
  "contectUs",
  "forgetPass",
  "login",
  "orderHistory",
  "register",
  "review",
  "sign_out",
  "transactionHistory",
  "user_profile",
];

adminRoutes.forEach((route) => {
  app.use("", require(`./src/routers/admin/${route}`));
});

userRoutes.forEach((route) => {
  app.use("", require(`./src/routers/user/${route}`));
});

// Start Server

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

// Handle Server Errors
app.on("error", (error) => {
  console.error(`❌ Server startup error: ${error.message}`);
});
