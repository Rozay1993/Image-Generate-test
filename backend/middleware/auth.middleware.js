const { signinSchema, signupSchema } = require("../validators/auth.validator");

// ** signin middleware
module.exports.signin = async (req, res, next) => {
  try {
    await signinSchema.validate(req.body);
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

// ** signup middleware
module.exports.signup = async (req, res, next) => {
  try {
    await signupSchema.validate(req.body);
    delete req.body.passwordConfirmation;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};
