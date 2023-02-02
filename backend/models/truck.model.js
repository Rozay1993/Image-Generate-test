const db = require("../utils/dbConfig.js");

const getTrucks = () => {
  return db("trucks")
    .select(
      "drivers.first_name",
      "drivers.last_name",
      "contractors.name as company_name",
      "trucks.id",
      "unit_number",
      "trucks.avatar",
      "vin",
      "make",
      "model",
      "year",
      "color",
      "sleeper",
      "license_state",
      "license_plate",
      "asset_type",
      "contractor_id",
      "driver_assigned_id",
      "apu_type",
      "samsara_id",
      "samsara_serial",
      "prepass_id",
      "toll_id",
      "odometer",
      "ifta",
      "dot_expiration_data",
      "annual_inspection_expiration",
      "license_plate_expiration",
      "annual_inspection",
      "insurance",
      "permits",
      "apportioned_registration",
      "trucks.status",
      "trucks.updatedAt"
    )
    .leftJoin("drivers", "drivers.id", "trucks.driver_assigned_id")
    .leftOuterJoin("contractors", "contractors.id", "trucks.contractor_id")
    .where("trucks.deleted", false);
};

const createTruck = (truck) => {
  return db("trucks").insert(truck);
};

const updateTruck = (truck) => {
  return db("trucks").where("id", truck.id).update(truck);
};

const deleteTruck = (id) => {
  return db("trucks").where("id", id).update("deleted", true);
};

const getTruckByUnitNum = (unitNum) => {
  return db("trucks").where("unit_number", unitNum).first();
};

module.exports = {
  getTrucks,
  createTruck,
  deleteTruck,
  updateTruck,
  getTruckByUnitNum,
};
