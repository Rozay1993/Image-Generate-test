const {
  brokerSchema,
  editBrokerSchema,
} = require("../validators/broker.validator");

// ** email check service import
let {
  brokerEmailCheck,
  brokerNameCheck,
} = require("../services/unique.service");

module.exports.createBroker = async (req, res, next) => {
  try {
    req.body.name = req.body?.name.toUpperCase();
    await brokerSchema.validate(req.body);
    delete req.body.submit;
    // req.body.status = req.body.status === "true" || req.body.status === "1";
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

module.exports.editBroker = async (req, res, next) => {
  try {
    if (req.user.role_id === 1) {
      req.body.name = req.body?.name.toUpperCase();
      // ** Name Check
      if (!(await brokerNameCheck(req.body.name, req.body.id))) {
        res.status(400).json({
          path: "name",
          message: "This name is already used.",
        });
      } else {
        // ** Email Check
        const emailArr = req.body.email.split(", ");
        const uniqueArr = [...new Set(emailArr)];
        if (emailArr.length === uniqueArr.length) {
          if (!(await brokerEmailCheck(emailArr, req.body.id))) {
            res.status(400).json({
              path: "email",
              message: "This name is already used.",
            });
          } else {
            await editBrokerSchema.validate(req.body);
            delete req.body.submit;
            // req.body.status = req.body.status === "true" || req.body.status === "1";
            next();
          }
        } else {
          res.status(400).json({
            path: "email",
            message: "The email must be unique.",
          });
        }
      }
    } else {
      throw new Error("Permission Denied");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
