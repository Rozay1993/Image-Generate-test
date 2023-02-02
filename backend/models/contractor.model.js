const db = require("../utils/dbConfig.js");

const findByEmail = (email) => {
  return db("contractors").select("id").where("email", email);
};

const getContractors = () => {
  return db("contractors")
    .select(
      "id",
      "name",
      "logo",
      "address",
      "email",
      "phone_number",
      "tax_id",
      "status",
      "updatedAt"
    )
    .where("deleted", false);
};

const createContractor = (contractor) => {
  return db("contractors").insert(contractor);
};

const deleteContractor = (id) => {
  return db("contractors").where("id", id).update("deleted", true);
};

const editContractor = (contractor) => {
  return db("contractors").where("id", "=", contractor.id).update(contractor);
};

module.exports = {
  getContractors,
  findByEmail,
  createContractor,
  deleteContractor,
  editContractor,
};
