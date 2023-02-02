// ** Import Truck Model
const { getCompanySettings } = require("../models/companySettings.model");
const { getContractors } = require("../models/contractor.model");
var {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} = require("../models/driver.model");
const { getTrucks } = require("../models/truck.model");
const { filename2list } = require("../utils/filename2list");

exports.getDrivers = async (req, res, next) => {
  try {
    let drivers = await getDrivers();
    let trucks = await getTrucks();
    let contractors = await getContractors();
    let companySettings = await getCompanySettings();
    drivers = drivers.map((_item) => {
      return { name: _item.first_name + " " + _item.last_name, ..._item };
    });
    res.json({ drivers, trucks, contractors, companySettings });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createDriver = async (req, res, next) => {
  try {
    req.body = {
      ...req.body,
      ...filename2list(req.files, [
        "avatar",
        "driver_license",
        "medical_exam",
        "safety_agreement",
        "agreement",
        "ssn_pdf",
      ]),
    };
    await createDriver(req.body);
    res.json({
      data: req.body,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

exports.updateDriver = async (req, res, next) => {
  try {
    req.body = {
      ...req.body,
      ...filename2list(req.files, [
        "avatar",
        "driver_license",
        "medical_exam",
        "safety_agreement",
        "agreement",
        "ssn_pdf",
      ]),
    };
    await updateDriver(req.body);
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteDriver = async (req, res, next) => {
  try {
    const { id } = req.query;
    await deleteDriver(id);
    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
