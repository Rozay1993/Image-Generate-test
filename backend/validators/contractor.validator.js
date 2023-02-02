let yup = require("yup");

// ** email check service import
let { contractorEmailCheck } = require("../services/unique.service");

const contractorSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required")
    .test("Email test", "the Email address already exists.", async (value) => {
      return contractorEmailCheck(value);
    }),
  name: yup.string().max(255).required("Company Name is required"),
  phone_number: yup
    .string()
    .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "Must be a valid phone number")
    .required("Phone number is required"),
  address: yup.string().max(255).required("Address is required"),
  tax_id: yup.string().max(255).required("Tax ID is required"),
});

const editContractorSchema = yup.object().shape({
  id: yup
    .string()
    .matches(/^[0-9]*$/, "Must be a valid id")
    .required("Id field is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  name: yup.string().max(255).required("Company Name is required"),
  phone_number: yup
    .string()
    .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "Must be a valid phone number")
    .required("Phone number is required"),
  address: yup.string().max(255).required("Address is required"),
  tax_id: yup.string().max(255).required("Tax ID is required"),
});

module.exports = {
  editContractorSchema,
  contractorSchema,
};
