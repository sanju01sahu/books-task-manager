const jwt = require("jsonwebtoken");
const { errorHandler } = require("../middlewares/error.middleware");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { authenticateUser };
