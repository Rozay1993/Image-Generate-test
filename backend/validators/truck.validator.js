let yup = require("yup");

let { truckUnitNumCheck } = require("../services/unique.service");

const createTruckSchema = yup.object().shape({
  vin: yup.string().max(255).required("VIN is required"),
  unit_number: yup
    .string()
    .test(
      "Unit Number Test",
      "The Unit Number already exists.",
      async (value) => {
        return truckUnitNumCheck(value);
      }
    ),
});

const editTruckSchema = yup.object().shape({
  vin: yup.string().max(255).required("VIN is required"),
});

module.exports = {
  createTruckSchema,
  editTruckSchema,
};
