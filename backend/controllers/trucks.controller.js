// ** Import Truck Model
const { getCompanySettings } = require("../models/companySettings.model");
const { getContractors } = require("../models/contractor.model");
const { getDrivers } = require("../models/driver.model");
var {
  getTrucks,
  createTruck,
  deleteTruck,
  updateTruck,
} = require("../models/truck.model");
const { filename2list } = require("../utils/filename2list");

exports.getTrucks = async (req, res, next) => {
  try {
    var trucks = await getTrucks();
    var drivers = await getDrivers();
    let contractors = await getContractors();
    let companySettings = await getCompanySettings();
    res.json({ trucks, drivers, contractors, companySettings });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createTruck = async (req, res, next) => {
  try {
    req.body = {
      ...req.body,
      ...filename2list(req.files, [
        "avatar",
        "annual_inspection",
        "insurance",
        "permits",
        "apportioned_registration",
      ]),
    };
    delete req.body.submit;
    await createTruck(req.body);
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateTruck = async (req, res, next) => {
  try {
    req.body = {
      ...req.body,
      ...filename2list(req.files, [
        "avatar",
        "annual_inspection",
        "insurance",
        "permits",
        "apportioned_registration",
      ]),
    };
    delete req.body.submit;
    await updateTruck(req.body);
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteTruck = async (req, res, next) => {
  try {
    const { id } = req.query;
    await deleteTruck(id);
    res.json({ message: "Deleted users successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
