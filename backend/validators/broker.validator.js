let yup = require("yup");

// ** email check service import
let {
  brokerEmailCheck,
  brokerNameCheck,
} = require("../services/unique.service");

const brokerSchema = yup.object().shape({
  email: yup
    .string()
    .max(255)
    .matches(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9\-]+\.)+([a-zA-Z0-9\-\.]+)+([,][\s]([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9\-]+\.)+([a-zA-Z0-9\-\.]+))*$/,
      "Must be a valid Email Address"
    )
    .required("Email is required")
    .test("Email test", "The Email address already exists.", async (value) => {
      const emailArr = value.split(", ");
      const uniqueArr = [...new Set(emailArr)];
      if (emailArr.length === uniqueArr.length) {
        return await brokerEmailCheck(emailArr);
      } else {
        return false;
      }
    }),
  name: yup
    .string()
    .max(255)
    .required("Company Name is required")
    .test("Name Test", "This name is already used.", async (value) => {
      return await brokerNameCheck(value);
    }),
  phone_number: yup
    .string()
    .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "Must be a valid phone number")
    .required("Phone number is required"),
  address: yup.string().max(255).required("Address is required"),
  mc_number: yup.string().max(255).required("MC is required"),
});

const editBrokerSchema = yup.object().shape({
  id: yup
    .string()
    .matches(/^[0-9]*$/, "Must be a valid id")
    .required("Id field is required"),
  email: yup
    .string()
    .max(255)
    .matches(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9\-]+\.)+([a-zA-Z0-9\-\.]+)+([,][\s]([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9\-]+\.)+([a-zA-Z0-9\-\.]+))*$/,
      "Must be a valid Email Address"
    )
    .required("Email is required")
    .test("Email test", "The Email address already exists.", async (value) => {
      const emailArr = value.split(", ");
      const uniqueArr = [...new Set(emailArr)];
      if (emailArr.length === uniqueArr.length) {
        return true;
      } else {
        return false;
      }
    }),
  name: yup.string().max(255).required("Company Name is required"),
  phone_number: yup
    .string()
    .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "Must be a valid phone number")
    .required("Phone number is required"),
  address: yup.string().max(255).required("Address is required"),
  mc_number: yup.string().max(255).required("MC is required"),
});

module.exports = {
  editBrokerSchema,
  brokerSchema,
};
