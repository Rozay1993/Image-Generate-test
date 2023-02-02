// ** Import models
var { editUser, findByEmail } = require("../models/user.model");

module.exports.edit = async (req, res, next) => {
  try {
    if (req.files?.avatar) {
      await editUser({
        id: req.user.id,
        avatar: req.files.avatar[0].location,
        ...req.body,
      });
    } else {
      await editUser({
        id: req.user.id,
        ...req.body,
      });
    }

    let user = (await findByEmail(req.body?.email))[0];
    req.user = { ...user };
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
