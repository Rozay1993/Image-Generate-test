var express = require("express");

// ** import middleware
var passportMiddleware = require("../../middleware/passport.middleware");
var userMiddleware = require("../../middleware/user.middleware");
var avatarMiddleware = require("../../middleware/avatar.middleware");

// ** Import controller
var usersController = require("../../controllers/users.controller");

var router = express.Router();

// ** Get users
router.get("/", passportMiddleware.requireAuth, usersController.getUsers);

// ** Add a user
router.post(
  "/",
  passportMiddleware.requireAuth,
  avatarMiddleware.uploadAvatar,
  userMiddleware.addUser,
  usersController.addUser
);

// ** Edit a user
router.put(
  "/",
  passportMiddleware.requireAuth,
  avatarMiddleware.uploadAvatar,
  userMiddleware.editUser,
  usersController.editUser
);

// ** Delete multiple/a user(s)
router.post(
  "/delete",
  passportMiddleware.requireAuth,
  usersController.deleteUsers
);

module.exports = router;
