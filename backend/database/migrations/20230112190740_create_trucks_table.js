/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("trucks", function (table) {
    table.increments("id");
    table.mediumint("unit_number").unique().notNullable();
    table.string("vin", 255).notNullable();
    table.string("make", 255).notNullable();
    table.string("model", 255).notNullable();
    table.dateTime("year").notNullable();
    table.string("color", 255).notNullable();
    table.string("sleeper", 255).notNullable();
    table.string("license_state", 255).notNullable();
    table.string("license_plate", 255).notNullable();
    table.boolean("asset_type").notNullable();
    table.mediumint("contractor_id").notNullable();
    table.string("apu_type", 255).notNullable();
    table.string("samsara_id", 255).notNullable();
    table.string("samsara_serial", 255).notNullable();
    table.string("prepass_id", 255).notNullable();
    table.string("toll_id", 255).notNullable();
    table.mediumint("odometer").notNullable();
    table.string("ifta", 255).notNullable();
    table.dateTime("dot_expiration_data").notNullable();
    table.dateTime("annual_inspection_expiration").notNullable();
    table.dateTime("license_plate_expiration").notNullable();
    table.string("annual_inspection", 255).notNullable();
    table.string("insurance", 255).notNullable();
    table.string("permits", 255).notNullable();
    table.string("apportioned_registration", 255).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("trucks");
};
