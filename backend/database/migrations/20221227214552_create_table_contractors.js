/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("contractors", function (table) {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("avatar", 255);
    table.string("phone_number", 255).notNullable();
    table.string("email", 255).notNullable();
    table.unique("email");
    table.string("address", 255).notNullable();
    table.string("tax_id", 255).notNullable();
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
  return knex.schema.dropTable("contractors");
};
