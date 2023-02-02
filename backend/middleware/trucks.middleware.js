const { truckUnitNumCheck } = require("../services/unique.service");
const {
  createTruckSchema,
  editTruckSchema,
} = require("../validators/truck.validator");
const { string2date } = require("../utils/string2date");

module.exports.createTruck = async (req, res, next) => {
  try {
    req.body.status = req.body.status === "true" || req.body.status === "1";
    await createTruckSchema.validate(req.body);
    // ** Type convert
    req.body = string2date(req.body, [
      "year",
      "dot_expiration_data",
      "annual_inspection_expiration",
      "license_plate_expiration",
    ]);
    req.body.driver_assigned_id =
      req.body.driver_assigned_id === ""
        ? 0
        : Number(req.body.driver_assigned_id);
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

module.exports.updateTruck = async (req, res, next) => {
  try {
    req.body.status = req.body.status === "true" || req.body.status === "1";
    await editTruckSchema.validate(req.body);
    // ** Unit Number Check
    if (!(await truckUnitNumCheck(req.body.unit_number, req.body.id))) {
      res.status(400).json({
        path: "unit_number",
        message: "This Unit Number is already used.",
      });
    }
    // ** Type convert
    req.body = string2date(req.body, [
      "year",
      "dot_expiration_data",
      "annual_inspection_expiration",
      "license_plate_expiration",
    ]);
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
