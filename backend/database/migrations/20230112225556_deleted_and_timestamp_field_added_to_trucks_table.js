/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("trucks", function (table) {
    table.boolean("deleted").notNullable().defaultTo(false);
    table.boolean("status").defaultTo(true).notNullable();
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
  return knex.schema.table("trucks", function (table) {
    table.dropColumn("deleted");
    table.dropColumn("updatedAt");
    table.dropColumn("createdAt");
    table.dropColumn("status");
  });
};
