const express = require("express");
const router = express.Router();
const contactController = require("../controllers/admin/contactController");

// Render contact form page
router.get("/contact", (req, res) => {
  res.render("fonts/contact", { title: "Contact Us" });
});

router.post("/contact", contactController.createContact);
router.get("/contacts", contactController.getAllContacts);
router.put("/contact/:id", contactController.updateContact);
router.delete("/contact/:id", contactController.deleteContact);


module.exports = router;

