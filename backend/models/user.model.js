const db = require("../utils/dbConfig.js");

// GET SPECIFIC USER BY EMAIL
const findByEmail = (email) => {
  return db("users").where("email", email);

  //SQL RAW METHOD
  // return db.raw(`SELECT * FROM users
  //                  WHERE id = ${id}`);
};

const createUser = (user) => {
  return db("users").insert(user);
};

const getUsers = (userId) => {
  return db("users")
    .select(
      "users.id",
      "name",
      "avatar",
      "email",
      "role",
      "user_role.id as role_id",
      "phone_number",
      "status",
      "updatedAt"
    )
    .leftJoin("user_role", "users.role_id", "user_role.id")
    .where((builder) =>
      builder.whereNotIn("users.id", [1, userId]).where("users.deleted", false)
    );
};

const addUser = (user) => {
  return db("users").insert(user);
};

const editUser = (user) => {
  if (user.edit_password === "true" || user.edit_password === "1") {
    delete user.edit_password;

    return db("users").where("id", "=", user.id).update(user);
  } else {
    delete user.edit_password;
    delete user.password;
    return db("users").where("id", "=", user.id).update(user);
  }
};

const deleteUsers = (users) => {
  return db("users").whereIn("id", users).update("deleted", true);
};

module.exports = {
  findByEmail,
  createUser,
  getUsers,
  addUser,
  editUser,
  deleteUsers,
};
