/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_role").del();
  await knex("user_role").insert([
    { id: 1, role: "Super Admin" },
    { id: 2, role: "Admin" },
    { id: 3, role: "Accounting" },
    { id: 4, role: "Manager" },
    { id: 5, role: "Dispatch" },
  ]);
};
