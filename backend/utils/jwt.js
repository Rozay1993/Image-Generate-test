const jwt = require("jwt-simple");

module.exports.tokenForUser = function (user) {
  const timestamp = new Date().getTime();

  return jwt.encode(
    {
      sub: user.email,
      iat: timestamp,
      id: user.id,
      phone_number: user.phone_number,
      name: user.name,
      avatar: user.avatar,
    },
    process.env.TOKEN_SECRET
  );
};
