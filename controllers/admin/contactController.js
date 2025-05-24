const Contact = require("../../models/contactModel");


const createContact = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newContact = await Contact.create({ name, email, message });
    res.status(201).json({
      message: "Message submitted successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error("Create contact error:", error);
    res.status(500).json({ message: "Server error while submitting message" });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ contacts });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({ message: "Server error while fetching contacts" });
  }
};


const getContactBySlug = async (req, res) => {
  try {
    const contact = await Contact.findOne({ slug: req.params.slug });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ contact });
  } catch (error) {
    console.error("Get contact error:", error);
    res.status(500).json({ message: "Server error while fetching contact" });
  }
};

const updateContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = await Contact.findOne({ slug: req.params.slug });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.message = message || contact.message;

    await contact.save();
    res.status(200).json({
      message: "Contact updated successfully",
      contact,
    });
  } catch (error) {
    console.error("Update contact error:", error);
    res.status(500).json({ message: "Server error while updating contact" });
  }
};


const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ slug: req.params.slug });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({ message: "Server error while deleting contact" });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactBySlug,
  updateContact,
  deleteContact,
};
