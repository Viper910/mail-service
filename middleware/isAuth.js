const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  let token = req.get("Authorization");
  if (!token) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  } else {
    token = token.split(" ")[1];
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
}

module.exports = isAuth;
