module.exports.edit = (field, method) => (req, res, next) => {
  req.headers.field = field;
  req.headers.avatar = method;
  next();
};
