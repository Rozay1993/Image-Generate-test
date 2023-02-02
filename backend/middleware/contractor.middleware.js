const {
  contractorSchema,
  editContractorSchema,
} = require("../validators/contractor.validator");
var { findByEmail } = require("../models/contractor.model");

module.exports.createContractor = async (req, res, next) => {
  try {
    await contractorSchema.validate(req.body);
    delete req.body.submit;
    req.body.status = req.body.status === "true" || req.body.status === "1";
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

module.exports.editContractor = async (req, res, next) => {
  try {
    if (req.user.role_id === 1) {
      // ** Email check
      let contractor = (await findByEmail(req.body?.email))[0];
      if (
        contractor?.id.toString() === req.body.id ||
        typeof contractor === "undefined"
      ) {
        await editContractorSchema.validate(req.body);
        delete req.body.submit;
        req.body.status = req.body.status === "true" || req.body.status === "1";
        next();
      } else {
        throw new Error("Email address already exist!");
      }
    } else {
      throw new Error("Not permission");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
