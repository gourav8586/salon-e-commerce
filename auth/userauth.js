const jwt = require("jsonwebtoken");
const userModel = require("../src/model/user");

module.exports = async (req, res, next) => {
  try {
  const token = 
      req.cookies.sujwt || 
      req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, "soluse");
    const userData = await userModel.findById(decoded._id);

    if (!userData) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.user = userData; // attach user to request
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token please login again" });
  }
};

