var router = require("express").Router();

// ** Middleware Import
var passportMiddleware = require("../../middleware/passport.middleware");
var headerMiddleware = require("../../middleware/header.middleware");
var avatarMiddleware = require("../../middleware/avatar.middleware");
var driversMiddleware = require("../../middleware/drivers.middleware");

// ** Controller Import
var driversController = require("../../controllers/drivers.controller");

// ** Read
router.get("/", passportMiddleware.requireAuth, driversController.getDrivers);

// ** Create
router.post(
  "/",
  passportMiddleware.requireAuth,
  headerMiddleware.edit("drivers", "add"),
  avatarMiddleware.uploadAvatar,
  driversMiddleware.createDriver,
  driversController.createDriver
);

// ** Update
router.put(
  "/",
  passportMiddleware.requireAuth,
  headerMiddleware.edit("drivers", "edit"),
  avatarMiddleware.uploadAvatar,
  driversMiddleware.updateDriver,
  driversController.updateDriver
);

// ** Delete a truck
router.delete(
  "/",
  passportMiddleware.requireAuth,
  driversController.deleteDriver
);

module.exports = router;
