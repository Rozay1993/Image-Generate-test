var router = require("express").Router();

// ** Middleware Import
var passportMiddleware = require("../../middleware/passport.middleware");
var avatarMiddleware = require("../../middleware/avatar.middleware");
var headerMiddleware = require("../../middleware/header.middleware");
var truckMiddleware = require("../../middleware/trucks.middleware");

// ** Controller Import
var trucksController = require("../../controllers/trucks.controller");

// ** Read
router.get("/", passportMiddleware.requireAuth, trucksController.getTrucks);

// ** Create
router.post(
  "/",
  passportMiddleware.requireAuth,
  headerMiddleware.edit("trucks", "add"),
  avatarMiddleware.uploadAvatar,
  truckMiddleware.createTruck,
  trucksController.createTruck
);

// ** Update
router.put(
  "/",
  passportMiddleware.requireAuth,
  headerMiddleware.edit("trucks", "add"),
  avatarMiddleware.uploadAvatar,
  truckMiddleware.updateTruck,
  trucksController.updateTruck
);

// ** Delete a truck
router.delete(
  "/",
  passportMiddleware.requireAuth,
  trucksController.deleteTruck
);

module.exports = router;
