// ** User model Import
const UserModel = require("../models/user.model");

// ** bcrypt Import
const bcrypt = require("bcrypt");
const saltRounds = 10;

const emailCheck = async (data) => {
  try {
    let user = (await UserModel.findByEmail(data))[0];
    if (typeof user === "undefined") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const bcryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

module.exports = {
  emailCheck,
  bcryptPassword,
};
