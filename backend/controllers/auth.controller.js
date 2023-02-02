const { createUser } = require("../models/user.model");
const tokenForUser = require("../utils/jwt").tokenForUser;

// ** bcrypt password Import
var { bcryptPassword } = require("../services/auth.service");

exports.signin = function (req, res) {
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = async (req, res, next) => {
  try {
    req.body.password = bcryptPassword(req.body.password);
    await createUser(req.body);
    res.send({
      message: "User registration successful!",
    });
  } catch (error) {
    next(error);
  }
};
