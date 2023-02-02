const passport = require('passport');
require('../services/passport');

const requireAuth = passport.authenticate('jwt', {
  session: false
});
const requireSignIn = passport.authenticate('local', {
  session: false
});

module.exports.requireAuth = requireAuth;
module.exports.requireSignIn = requireSignIn;
