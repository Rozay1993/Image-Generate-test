// ** Import User Model
const { getMaxId } = require("../utils/db");

/**
 *
 * @param {string | null} field This is a field related with where the avatar comes from.
 * @param {string} method The field related with some method such as avatar add and edit.
 * @param {string} fieldname The fieldname of avatar.
 * @param {string} originalname The originalname of avatar.
 * @param {string | null} userId user is that will be edited.
 * @param {string | null} authId the user's id who login the system.
 * @returns {string} An avatar name.
 */
module.exports.avatar = async (
  field,
  method,
  fieldname,
  originalname,
  userId,
  authId
) => {
  var filename = field || "users";
  filename += "/";

  switch (method) {
    case "add":
      let id = (await getMaxId(field || "users"))[0].AUTO_INCREMENT;
      filename += id;
      break;
    case "edit":
      filename += userId;
      break;
    case "profile":
      filename += authId;
      break;
    default:
      break;
  }
  filename +=
    (originalname === ".pdf" ? "/pdfs/" : "/images/") +
    fieldname +
    "/" +
    fieldname +
    "-" +
    Date.now() +
    originalname;
  return filename;
};
