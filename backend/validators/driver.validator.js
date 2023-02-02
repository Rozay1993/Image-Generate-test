let yup = require("yup");

let { driverEmailCheck } = require("../services/unique.service");

const createDriverSchema = yup.object().shape({
  first_name: yup.string().max(255).required("First Name is required"),
  last_name: yup.string().max(255).required("Last Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required")
    .test("Email test", "The Email address already exists.", async (value) => {
      return driverEmailCheck(value);
    }),
  phone_number: yup
    .string()
    .length(12, "Must be a valid phone number")
    .required("Phone number is required"),
});

const updateDriverSchema = yup.object().shape({
  first_name: yup.string().max(255).required("First Name is required"),
  last_name: yup.string().max(255).required("Last Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  phone_number: yup
    .string()
    .length(12, "Must be a valid phone number")
    .required("Phone number is required"),
});

module.exports = {
  createDriverSchema,
  updateDriverSchema,
};
