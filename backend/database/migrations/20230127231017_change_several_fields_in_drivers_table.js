/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("drivers", function (table) {
    table.dropColumn("name");
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("drivers", function (table) {
    table.dropColumn("first_name");
    table.dropColumn("last_name");
    table.string("name", 255).notNullable();
  });
};
