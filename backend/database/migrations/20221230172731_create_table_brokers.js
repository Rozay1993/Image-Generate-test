/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("brokers", function (table) {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("logo", 255);
    table.string("phone_number", 255).notNullable();
    table.string("address", 255).notNullable();
    table.string("contactName", 255);
    table.string("mc_number", 255).notNullable();
    table.boolean("deleted").notNullable().defaultTo(false);
    table
      .timestamp("createdAt")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table
      .timestamp("updatedAt")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("brokers");
};
