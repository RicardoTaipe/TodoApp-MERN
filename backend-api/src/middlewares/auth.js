const jwt = require("jsonwebtoken");
const config = require("../config/configuration");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.userData = decoded;
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
  next();
};
