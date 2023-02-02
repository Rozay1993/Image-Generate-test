const db = require("../utils/dbConfig.js");

const findByEmail = (emailArr) => {
  return db("broker_email")
    .select("broker_id")
    .whereIn("email_address", emailArr);
};

const findByName = (name) => {
  return db("brokers").select("id").where("name", name);
};

const getBrokers = () => {
  return db("brokers")
    .select(
      "brokers.id",
      "name",
      "logo",
      "address",
      "phone_number",
      "mc_number",
      "contactName",
      "email_address",
      "updatedAt"
    )
    .leftJoin("broker_email", "broker_email.broker_id", "brokers.id")
    .where("deleted", false)
    .orderBy("id");
};

const createBroker = (broker) => {
  const emailArr = broker.email.split(", ");
  delete broker.email;
  return db.transaction(function (trx) {
    return trx
      .insert(broker)
      .into("brokers")
      .then(function (ids) {
        var brokerEmail = emailArr.map((_item) => {
          return {
            broker_id: ids,
            email_address: _item,
          };
        });
        return trx("broker_email").insert(brokerEmail);
      });
  });
};

const deleteBroker = (id) => {
  return db("brokers").where("id", id).update("deleted", true);
};

const editBroker = (broker) => {
  const emailArr = broker.email.split(", ");
  delete broker.email;
  return db.transaction(async (trx) => {
    await trx("broker_email").where("broker_id", broker.id).del();
    await trx("brokers").where("id", broker.id).update(broker);
    var brokerEmail = emailArr.map((_item) => {
      return {
        broker_id: broker.id,
        email_address: _item,
      };
    });
    await trx("broker_email").insert(brokerEmail);
  });
};

module.exports = {
  getBrokers,
  findByEmail,
  createBroker,
  deleteBroker,
  editBroker,
  findByName,
};
