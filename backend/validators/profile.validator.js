var yup = require("yup");

const editProfileSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  name: yup.string().max(255).required("Full Name is required"),
  phone_number: yup
    .string()
    .length(12, "Must be a valid phone number")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password must be over 8 letters")
    .max(255)
    .required("Password is required"),
  old_password: yup
    .string()
    .min(8, "Old password must be over 8 letters")
    .max(255)
    .required("Old password is required"),
});

module.exports = {
  editProfileSchema,
};
