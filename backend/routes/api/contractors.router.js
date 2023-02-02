var router = require("express").Router();

// ** import middleware
var passportMiddleware = require("../../middleware/passport.middleware");
var contractorMiddleware = require("../../middleware/contractor.middleware");
var headerMiddleware = require("../../middleware/header.middleware");
var avatarMiddleware = require("../../middleware/avatar.middleware");

// ** Import controllers
var contractorsController = require("../../controllers/contractors.controller");

// ** Get contractors
router.get(
  "/",
  passportMiddleware.requireAuth,
  contractorsController.getContractors
);

// ** Add new contractors
router.post(
  "/",
  passportMiddleware.requireAuth,
  headerMiddleware.edit("contractors", "add"),
  avatarMiddleware.uploadAvatar,
  contractorMiddleware.createContractor,
  contractorsController.createContractor
);

// ** Edit a contractor
router.put(
  "/",
  passportMiddleware.requireAuth,
  headerMiddleware.edit("contractors", "edit"),
  avatarMiddleware.uploadAvatar,
  contractorMiddleware.editContractor,
  contractorsController.editContractor
);

// ** Delete a contractor
router.delete(
  "/",
  passportMiddleware.requireAuth,
  contractorsController.deleteContractor
);

module.exports = router;
