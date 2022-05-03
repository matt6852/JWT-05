const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userName = decoded.username;
    next();
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(
      "Not authorized ot access this route: " + error,
      401
    );
  }
};

module.exports = authMiddleware;
