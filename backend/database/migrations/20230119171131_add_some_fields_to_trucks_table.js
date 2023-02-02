/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("trucks", function (table) {
    table.string("avatar", 250).notNullable();
    table.mediumint("driver_assigned_id").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("trucks", function (table) {
    table.dropColumn("avatar");
    table.dropColumn("driver_assigned_id");
  });
};
