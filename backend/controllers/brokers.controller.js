var {
  getBrokers,
  createBroker,
  deleteBroker,
  editBroker,
} = require("../models/broker.model");

module.exports.getBrokers = async (req, res, next) => {
  try {
    var brokersTemp = await getBrokers();
    var brokers = [];

    brokersTemp.map((_item, _index) => {
      if (_index === 0) {
        brokers[0] = { ..._item, email: _item.email_address };
      } else {
        if (brokers[brokers.length - 1].id === _item.id) {
          brokers[brokers.length - 1] = {
            ...brokers[brokers.length - 1],
            email:
              brokers[brokers.length - 1].email + ", " + _item.email_address,
          };
        } else {
          brokers[brokers.length] = {
            ..._item,
            email: _item.email_address,
          };
        }
      }
    });

    res.json({
      brokers,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports.createBroker = async (req, res, next) => {
  try {
    if (req.files?.avatar) {
      await createBroker({ ...req.body, logo: req.files.avatar[0].location });
    } else {
      req.body.logo = req.body.avatar;
      delete req.body.avatar;
      await createBroker(req.body);
    }
    res.json({
      message: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

module.exports.deleteBroker = async (req, res, next) => {
  try {
    const { id } = req.query;
    await deleteBroker(id);
    res.json({
      message: "Broker deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

module.exports.editBroker = async (req, res, next) => {
  try {
    if (req.files?.avatar) {
      await editBroker({ ...req.body, logo: req.files.avatar[0].location });
    } else {
      req.body.logo = req.body.avatar;
      delete req.body.avatar;
      await editBroker(req.body);
    }
    res.json({
      message: "successfully edited",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
