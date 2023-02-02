var {
  getContractors,
  createContractor,
  deleteContractor,
  editContractor,
} = require("../models/contractor.model");

module.exports.getContractors = async (req, res, next) => {
  try {
    var contractors = await getContractors();
    res.json({
      contractors,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports.createContractor = async (req, res, next) => {
  try {
    if (req.files?.avatar) {
      await createContractor({
        ...req.body,
        logo: req.files.avatar[0].location,
      });
    } else {
      req.body.logo = req.body.avatar;
      delete req.body.avatar;
      await createContractor(req.body);
    }
    res.json({
      message: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

module.exports.deleteContractor = async (req, res, next) => {
  try {
    const { id } = req.query;
    await deleteContractor(id);
    res.json({
      message: "Delete a contractor successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

module.exports.editContractor = async (req, res, next) => {
  try {
    if (req.files?.avatar) {
      await editContractor({ ...req.body, logo: req.files.avatar[0].location });
    } else {
      req.body.logo = req.body.avatar;
      delete req.body.avatar;
      await editContractor(req.body);
    }
    res.json({
      message: "successfully edited",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
