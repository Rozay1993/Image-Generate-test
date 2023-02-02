var router = require("express").Router();

// ** import middleware
var passportMiddleware = require("../../middleware/passport.middleware");
var brokerMiddleware = require("../../middleware/broker.middleware");
var headerMiddleware = require("../../middleware/header.middleware");
var avatarMiddleware = require("../../middleware/avatar.middleware");

// ** Import controllers
var brokersController = require("../../controllers/brokers.controller");

// ** Get brokers
router.get(
  "/",
  passportMiddleware.requireAuth,
  brokersController.getBrokers
);

// ** Add new brokers
router.post(
  "/",
  passportMiddleware.requireAuth,
  headerMiddleware.edit("brokers", "add"),
  avatarMiddleware.uploadAvatar,
  brokerMiddleware.createBroker,
  brokersController.createBroker
);

// ** Edit a broker
router.put(
  "/",
  passportMiddleware.requireAuth,
  headerMiddleware.edit("brokers", "edit"),
  avatarMiddleware.uploadAvatar,
  brokerMiddleware.editBroker,
  brokersController.editBroker
);

// ** Delete a broker
router.delete(
  "/",
  passportMiddleware.requireAuth,
  brokersController.deleteBroker
);

module.exports = router;
