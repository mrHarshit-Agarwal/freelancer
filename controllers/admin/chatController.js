const ChatMessage = require("../../models/chatModel");

const createChat = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const image = req.file?.filename;

    const chat = new ChatMessage({
      senderId,
      receiverId,
      message,
      image
    });

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

const getChatById = async (req, res) => {
  try {
    const chat = await ChatMessage.findById(req.params.id);
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateChat = async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) update.image = req.file.filename;

    const chat = await ChatMessage.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    const chat = await ChatMessage.findByIdAndDelete(req.params.id);
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json({ message: "Chat deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChat,
  getAllChats,
  getChatById,
  updateChat,
  deleteChat
};
