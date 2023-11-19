const Contact = require("../db/models/contact-model");

const getContacts = async () => {
  const result = await Contact.find();
  return result;
};

const addContact = async (data) => {
  const result = await Contact.create(data);
  return result;
};

const deleteContact = async (id) => {
    const result = await Contact.findByIdAndDelete(id);
    return result;
};
module.exports = { getContacts, addContact, deleteContact };
