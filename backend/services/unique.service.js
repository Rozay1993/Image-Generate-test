var { findByEmail } = require("../models/contractor.model");
var { getTruckByUnitNum } = require("../models/truck.model");
var { getDriverByEmail } = require("../models/driver.model");
var brokerModel = require("../models/broker.model");

const contractorEmailCheck = async (email) => {
  try {
    var contractor = await findByEmail(email);
    if (contractor.length === 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const brokerEmailCheck = async (emailArr, id = -1) => {
  try {
    var emails = await brokerModel.findByEmail(emailArr);
    if (emails.length === 0) {
      return true;
    } else {
      if (id === -1) {
        return false;
      } else {
        for (var i = 0; i < emails.length; i++) {
          if (emails[i].broker_id.toString() !== id) {
            return false;
          }
        }
        return true;
      }
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const brokerNameCheck = async (name, id = -1) => {
  try {
    var broker = await brokerModel.findByName(name);
    if (broker.length === 0) {
      return true;
    } else {
      if (id === -1) {
        return false;
      } else {
        return id === broker[0].id.toString();
      }
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const truckUnitNumCheck = async (unitNumber, id = -1) => {
  try {
    const truck = await getTruckByUnitNum(unitNumber);
    // ** When a Truck Create
    if (id === -1) {
      return truck?.id ? false : true;
    }
    // ** When a Truck Edit
    else {
      if (truck?.id) {
        return truck.id.toString() === id;
      } else {
        return true;
      }
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const driverEmailCheck = async (email, id = -1) => {
  try {
    const driver = await getDriverByEmail(email);

    if (id === -1) {
      // ** Test Email in Validator
      return driver?.id ? false : true;
    } else {
      // ** Test Email in Middleware
      return driver?.id ? driver.id.toString() === id : true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  contractorEmailCheck,
  brokerEmailCheck,
  brokerNameCheck,
  truckUnitNumCheck,
  driverEmailCheck,
};
