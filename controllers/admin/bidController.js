const Bid = require("../../models/bidModel");


const createBid = async (req, res) => {
  try {
    const { title, description, minPrice, maxPrice, bidsCount, projectType, duration } = req.body;
    const image = req.file?.filename;

    const bid = new Bid({
      title,
      description,
      minPrice,
      maxPrice,
      bidsCount,
      projectType,
      duration,
      image
    });

    await bid.save();
    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllbids = async (req, res) => {
  try {
    const bids = await Bid.find();
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getBidById = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: "Bid not found" });
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateBid = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.filename;

    const bid = await Bid.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndDelete(req.params.id);
    if (!bid) return res.status(404).json({ message: "Bid not found" });
    res.status(200).json({ message: "Bid deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBid,
  getAllbids,
  getBidById,
  updateBid,
  deleteBid,
};
