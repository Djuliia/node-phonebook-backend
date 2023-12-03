const Contact = require("../db/models/contact-model");

const getContacts = async (owner) => {
  const result = await Contact.find({ owner });
  return result;
};

const addContact = async (data, owner) => {
  const result = await Contact.create({ ...data, owner });
  return result;
};

const deleteContact = async (_id, owner) => {
  const result = await Contact.findOneAndDelete({ _id, owner });
  return result;
};
module.exports = { getContacts, addContact, deleteContact };
