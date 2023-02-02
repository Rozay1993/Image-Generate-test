const db = require("../utils/dbConfig.js");

const getCompanySettings = () => {
  return db("company_settings").select("id", "name");
};

module.exports = { getCompanySettings };
