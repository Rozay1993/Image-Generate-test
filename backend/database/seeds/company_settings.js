/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("company_settings").del();
  await knex("company_settings").insert([{ id: 1, name: "GTAcme" }]);
};
