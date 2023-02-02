var express = require('express');

// ** import controllers
var authController = require('../../controllers/auth.controller');

// ** import middleware
var authMiddleware = require('../../middleware/auth.middleware');
var passportMiddleware = require('../../middleware/passport.middleware');

var router = express.Router();

router.post(
	'/signin',
	authMiddleware.signin,
	passportMiddleware.requireSignIn,
	authController.signin
);

router.post('/signup', authMiddleware.signup, authController.signup);

router.get('/me', passportMiddleware.requireAuth, authController.signin);

module.exports = router;
