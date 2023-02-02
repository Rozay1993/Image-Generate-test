const {
  addUserSchema,
  editUserSchema,
} = require("../validators/user.validator");
const UserModel = require("../models/user.model");

module.exports.addUser = async (req, res, next) => {
  try {
    if (req.user.role_id === 1) {
      await addUserSchema.validate(req.body);
      delete req.body.submit;
      req.body.status = req.body.status === "true" || req.body.status === "1";
      next();
    } else {
      throw new Error("Not permission");
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports.editUser = async (req, res, next) => {
  try {
    if (req.user.role_id === 1) {
      // ** Email check
      let user = (await UserModel.findByEmail(req.body?.email))[0];
      if (user?.id.toString() === req.body.id || typeof user === "undefined") {
        await editUserSchema.validate(req.body);
        delete req.body.submit;
        req.body.status = req.body.status === "true" || req.body.status === "1";
        next();
      } else {
        throw new Error("Email address already exist!");
      }
    } else {
      throw new Error("Not permission");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};
