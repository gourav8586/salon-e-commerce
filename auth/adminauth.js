const jwt = require("jsonwebtoken");
const admin = require("../src/model/admin");

module.exports = async (req, res, next) => {
  try {
  const token = 
      req.cookies.sdjwt || 
      req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, "soladi");
    const adminData = await admin.findById(decoded._id);

    if (!adminData) {
      return res.status(401).json({ error: "Unauthorized: Admin not found" });
    }

    req.admin = adminData; // attach admin to request
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token please login again" });
  }
};

