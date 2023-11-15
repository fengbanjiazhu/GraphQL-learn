const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer")) {
    req.isAuth = false;
    return next();
  }

  token = token.split(" ")[1];

  const result = jwt.verify(token, process.env.JWT_SECRET);
  console.log(result);

  const currentUser = await User.findById(result.id);
  if (!currentUser) {
    req.isAuth = false;
    return next();
  }

  // Grand Access to Protected Route
  req.user = currentUser;
  next();
};
