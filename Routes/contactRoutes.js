const express = require("express");
const router = express.Router();
const contactController = require("../controllers/admin/contactController");

router.post("/contact", contactController.createContact);
router.get("/contacts", contactController.getAllContacts);
router.get("/contact/:slug", contactController.getContactBySlug);
router.put("/contact/:slug", contactController.updateContact);
router.delete("/contact/:slug", contactController.deleteContact);


module.exports = router;

