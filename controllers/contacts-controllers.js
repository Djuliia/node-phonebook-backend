const {
  getContacts,
  addContact,
  deleteContact,
} = require("../services/contacts-services");

const getContactsController = async (req, res) => {
  const { _id } = req.user;
  const result = await getContacts(_id);
  res.json(result);
};

const addContactController = async (req, res) => {
  const { _id } = req.user;

  const result = await addContact(req.body, _id);
  res.status(201).json(result);
};

const deleteContactController = async (req, res) => {
  const { _id } = req.user;

  const result = await deleteContact(req.params.contactId, _id);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(204).send();
};

module.exports = {
  getContactsController,
  addContactController,
  deleteContactController,
};
