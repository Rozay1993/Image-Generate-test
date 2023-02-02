/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      name: "super admin",
      email: "superadmin@admin.com",
      phone_number: "504-332-2234",
      role_id: 1,
      password:
        "$2b$10$sq2YaQtwtP1bpEl4b6pB..00hKiAD4HPNORuGGQBpgzOmL2VXvnCq" /* password : superadmin */,
    },
  ]);
};
