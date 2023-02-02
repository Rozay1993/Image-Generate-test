var router = require("express").Router();

// ** Middleware Import
var passportMiddleware = require("../../middleware/passport.middleware");
var profileMiddleware = require("../../middleware/profile.middleware");
var avatarMiddleware = require("../../middleware/avatar.middleware");

// ** Controller Import
var profileController = require("../../controllers/profile.controller");
var authController = require("../../controllers/auth.controller");

router.put(
  "/",
  passportMiddleware.requireAuth,
  avatarMiddleware.uploadAvatar,
  profileMiddleware.edit,
  profileController.edit,
  authController.signin
);
module.exports = router;
