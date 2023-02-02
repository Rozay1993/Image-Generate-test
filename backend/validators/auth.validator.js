let yup = require("yup");

let authService = require("../services/auth.service");

const signinSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().matches(new RegExp("^[a-zA-z0-9]{3,30}$")),
});

const signupSchema = yup.object().shape({
  first_name: yup.string().max(250).required(),
  last_name: yup.string().max(250).required(),
  email: yup
    .string()
    .email()
    .required()
    .test("Email test", "the Email address already exists.", async (value) => {
      return authService.emailCheck(value);
    }),
  role: yup.number().min(1).max(4).required(),
  password: yup.string().matches(new RegExp("^[a-zA-z0-9]{3,30}$")).required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

module.exports = {
  signinSchema,
  signupSchema,
};
