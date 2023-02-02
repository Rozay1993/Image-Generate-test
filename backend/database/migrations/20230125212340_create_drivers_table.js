/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("drivers", function (table) {
    table.increments("id");
    table.string("avatar", 250);
    table.string("name", 255).notNullable();
    table.string("phone_number", 25);
    table.string("email", 255).notNullable();
    table.dateTime("dob");
    table.string("ssn", 255);
    table.string("address", 255);
    table.boolean("contract_type").notNullable();
    table.mediumint("contractor_company_id");
    table.mediumint("company_id");
    table.string("emergency_contact", 255);
    table.dateTime("starting_date");
    table.string("cdl_number", 255);
    table.string("cdl_address", 255);
    table.string("cdl_class", 255);
    table.dateTime("cdl_expiration");
    table.dateTime("medical_expiration");
    table.string("driver_license", 255);
    table.string("medical_exam", 255);
    table.string("safety_agreement", 255);
    table.string("agreement", 255);
    table.string("ssn_pdf", 255);
    table.boolean("deleted").notNullable().defaultTo(false);
    table.boolean("status").defaultTo(true);
    table
      .timestamp("createdAt")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table
      .timestamp("updatedAt")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.unique("email");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("drivers");
};
