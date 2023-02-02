const { getMaxId } = require("../utils/db.js");
const db = require("../utils/dbConfig.js");

const getDrivers = () => {
  return db("drivers")
    .select(
      "drivers.id",
      "drivers.avatar",
      "first_name",
      "last_name",
      "drivers.phone_number",
      "drivers.email",
      "trucks.unit_number",
      "trucks.id as assigned_truck_id",
      "contractors.name as contractor_company_name",
      "company_settings.name as company_name",
      "dob",
      "ssn",
      "drivers.address",
      "contract_type",
      "emergency_contact",
      "starting_date",
      "cdl_number",
      "cdl_address",
      "cdl_class",
      "cdl_expiration",
      "medical_expiration",
      "driver_license",
      "medical_exam",
      "safety_agreement",
      "agreement",
      "ssn_pdf",
      "contractor_company_id",
      "company_id",
      "drivers.status",
      "drivers.updatedAt"
    )
    .leftJoin("trucks", "trucks.driver_assigned_id", "drivers.id")
    .leftOuterJoin(
      "company_settings",
      "company_settings.id",
      "drivers.company_id"
    )
    .leftOuterJoin(
      "contractors",
      "contractors.id",
      "drivers.contractor_company_id"
    )
    .where("drivers.deleted", false);
};

const createDriver = async (driver) => {
  // **
  await db("trucks")
    .where("id", driver.assigned_truck_id)
    .update({ driver_assigned_id: getMaxId("drivers") });
  delete driver.assigned_truck_id;
  // **
  if (driver.contract_type === "1") {
    driver.company_id = driver.contractor_company_id;
    delete driver.contractor_company_id;
  }
  // **
  return db("drivers").insert(driver);
};

const updateDriver = async (driver) => {
  // **
  await db("trucks")
    .where("id", driver.assigned_truck_id)
    .update({ driver_assigned_id: driver.id });
  delete driver.assigned_truck_id;
  // **
  if (driver.contract_type === "1") {
    driver.company_id = driver.contractor_company_id;
    delete driver.contractor_company_id;
  }
  return db("drivers").where("id", driver.id).update(driver);
};

const getDriverByEmail = (email) => {
  return db("drivers").where("email", email).first();
};

const deleteDriver = (id) => {
  return db("drivers").where("id", id).update("deleted", true);
};

module.exports = {
  getDrivers,
  createDriver,
  getDriverByEmail,
  updateDriver,
  deleteDriver,
};
