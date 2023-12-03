const express = require("express");
const {
  getContactsController,
  addContactController,
  deleteContactController,
} = require("../controllers/contacts-controllers");
const validateBody = require("../decorators/validateBody");
const { contactAddSchema } = require("../schemas/contact-schemas");
const isValidId = require("../midlewares/isValidId");
const authenticate = require("../midlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, getContactsController);

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.post(
  "/",
  authenticate,
  validateBody(contactAddSchema),
  addContactController
);

router.delete("/:contactId", authenticate, isValidId, deleteContactController);

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router;
