const express = require("express");
const {
  getContactsController,
  addContactController,
  deleteContactController,
} = require("../controllers/contacts-controllers");
const validateBody = require("../decorators/validateBody");
const { contactAddSchema } = require("../schemas/contact-schemas");
const isValidId = require("../midlewares/isValidId");

const router = express.Router();

router.get("/", getContactsController);

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.post("/", validateBody(contactAddSchema), addContactController);

router.delete("/:contactId", isValidId, deleteContactController);

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router;
