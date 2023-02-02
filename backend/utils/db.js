const db = require("./dbConfig.js");

const getMaxId = (tableName) => {
  return db("TABLES as T")
    .select("AUTO_INCREMENT")
    .withSchema("INFORMATION_SCHEMA")
    .where("TABLE_TYPE", "BASE TABLE")
    .where("TABLE_SCHEMA", db.raw("database()"))
    .where("TABLE_NAME", tableName);
};

module.exports = {
  getMaxId,
};
