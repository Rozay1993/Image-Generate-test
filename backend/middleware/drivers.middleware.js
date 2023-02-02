const { string2date } = require("../utils/string2date");
const {
  createDriverSchema,
  updateDriverSchema,
} = require("../validators/driver.validator");
let { driverEmailCheck } = require("../services/unique.service");

exports.createDriver = async (req, res, next) => {
  try {
    req.body.status = req.body.status === "true" || req.body.status === "1";
    await createDriverSchema.validate(req.body);
    req.body = string2date(req.body, [
      "dob",
      "starting_date",
      "medical_expiration",
      "cdl_expiration",
    ]);
    delete req.body.submit;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

exports.updateDriver = async (req, res, next) => {
  try {
    req.body.status = req.body.status === "true" || req.body.status === "1";
    await updateDriverSchema.validate(req.body);
    // ** Email Check
    if (!(await driverEmailCheck(req.body.email, req.body.id))) {
      res.status(400).json({
        path: "email",
        message: "This Email is already used.",
      });
    }
    req.body = string2date(req.body, [
      "dob",
      "starting_date",
      "medical_expiration",
      "cdl_expiration",
    ]);
    delete req.body.submit;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
