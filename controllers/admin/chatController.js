const ChatMessage = require("../../models/chatModel");
const fs = require("fs");
const path = require("path");


const createChat = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const image = req.file?.filename;

    const chat = new ChatMessage({ senderId, receiverId, message, image });
    await chat.save();

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllChats = async (req, res) => {
  try {
    const chats = await ChatMessage.find().sort({ timestamp: -1 });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getChatBySlug = async (req, res) => {
  try {
    const chat = await ChatMessage.findOne({ slug: req.params.slug });
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateChat = async (req, res) => {
  try {
    const chat = await ChatMessage.findOne({ slug: req.params.slug });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const { message } = req.body;

    if (message) {
      chat.message = message;
      chat.slug = slugify(message.substring(0, 10) + "-" + Date.now(), {
        lower: true,
        strict: true,
      });
    }

    if (req.file) {
      if (chat.image) {
        const oldImage = path.join("uploads/chat", chat.image);
        if (fs.existsSync(oldImage)) fs.unlinkSync(oldImage);
      }
      chat.image = req.file.filename;
    }

    await chat.save();
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    const chat = await ChatMessage.findOneAndDelete({ slug: req.params.slug });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    if (chat.image) {
      const imgPath = path.join("uploads/chat", chat.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.status(200).json({ message: "Chat deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChat,
  getAllChats,
  getChatBySlug,
  updateChat,
  deleteChat,
};
