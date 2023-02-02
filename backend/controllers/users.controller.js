// ** Import models
var {
  getUsers,
  addUser,
  editUser,
  deleteUsers,
} = require("../models/user.model");

// ** bcrypt password Import
var { bcryptPassword } = require("../services/auth.service");

exports.getUsers = async (req, res, next) => {
  try {
    var users = await getUsers(req.user.id);
    res.json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    req.body.password = bcryptPassword(req.body.password);
    if (req.files?.avatar) {
      await addUser({ ...req.body, avatar: req.files.avatar[0].location });
    } else {
      await addUser(req.body);
    }
    res.json({
      message: "success add a user",
    });
  } catch (error) {
    next(error);
  }
};

exports.editUser = async (req, res, next) => {
  try {
    req.body.password = bcryptPassword(req.body.password);
    if (req.files?.avatar) {
      await editUser({ ...req.body, avatar: req.files.avatar[0].location });
    } else {
      await editUser(req.body);
    }
    res.json({
      message: "success edit a user",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteUsers = async (req, res, next) => {
  try {
    await deleteUsers(req.body.selectedUsers);
    res.json({ message: "Deleted users successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
