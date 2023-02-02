// ** Validator Import
var { editProfileSchema } = require("../validators/profile.validator");

// ** bcrypt Import
var bcrypt = require("bcrypt");
var { bcryptPassword } = require("../services/auth.service");

// ** User Model Import
const UserModel = require("../models/user.model");

module.exports.edit = async (req, res, next) => {
  try {
    // ** Validate
    await editProfileSchema.validate(req.body);

    let user = (await UserModel.findByEmail(req.body?.email))[0];

    // ** Email check
    if (user?.id === req.user.id || typeof user === "undefined") {
      // ** Password check
      if (req.body.edit_password === "true") {
        // TODO: password compare
        bcrypt.compare(
          req.body.old_password,
          req.user.password,
          function (err, result) {
            // result == true
            if (result === true) {
              delete req.body.submit;
              delete req.body.old_password;
              req.body.password = bcryptPassword(req.body.password);
              next();
            } else {
              res.status(400).send(new Error("Old password Wrong!"));
            }
          }
        );
      } else {
        delete req.body.submit;
        delete req.body.old_password;
        delete req.body.password;
        next();
      }
    } else {
      throw new Error("Email address already exist!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
