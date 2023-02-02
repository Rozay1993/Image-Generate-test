let yup = require("yup");

let authService = require("../services/auth.service");

const addUserSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required")
    .test("Email test", "the Email address already exists.", async (value) => {
      return authService.emailCheck(value);
    }),
  name: yup.string().max(255).required("Full Name is required"),
  phone_number: yup
    .string()
    .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "Must be a valid phone number")
    .required("Phone number is required"),
  role_id: yup.number(),
  password: yup
    .string()
    .min(8, "Password must be over 8 letters")
    .max(255)
    .required("Password is required"),
});

const editUserSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  name: yup.string().max(255).required("Full Name is required"),
  phone_number: yup
    .string()
    .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "Must be a valid phone number")
    .required("Phone number is required"),
  role_id: yup.number(),
  password: yup
    .string()
    .min(8, "Password must be over 8 letters")
    .max(255)
    .required("Password is required"),
});

module.exports = {
  addUserSchema,
  editUserSchema,
};
