const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { errorMessage } = require("../utilf/responseSender.utils");

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.redirect("/");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, async (error, user) => {
    if (error) errorMessage(res, "Try loging in again .", error);
    const userDetails = await User.find({ email: user.email });
    req.user = userDetails[0];
    next();
  });
};

module.exports = isAuthenticated;
