const Bid = require("../../models/bidModel");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

// CREATE
const createBid = async (req, res) => {
  try {
    const { title, description, minPrice, maxPrice, bidCount, bidType, duration } = req.body;
    const image = req.file?.filename;

    const bid = new Bid({
      title,
      description,
      minPrice,
      maxPrice,
      bidCount,
      bidType,
      duration,
      image,
    });

    await bid.save();
    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
const getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find();
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BY SLUG
const getBidBySlug = async (req, res) => {
  try {
    const bid = await Bid.findOne({ slug: req.params.slug });
    if (!bid) return res.status(404).json({ message: "Bid not found" });
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE BY SLUG
const updateBidBySlug = async (req, res) => {
  try {
    const bid = await Bid.findOne({ slug: req.params.slug });
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    const { title, description, minPrice, maxPrice, bidCount, bidType, duration } = req.body;

    if (title) {
      bid.title = title;
      bid.slug = slugify(title, { lower: true, strict: true });
    }
    if (description) bid.description = description;
    if (minPrice) bid.minPrice = minPrice;
    if (maxPrice) bid.maxPrice = maxPrice;
    if (bidCount) bid.bidCount = bidCount;
    if (bidType) bid.bidType = bidType;
    if (duration) bid.duration = duration;

    if (req.file) {
      if (bid.image) {
        const imgPath = path.join("uploads/bid", bid.image);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }
      bid.image = req.file.filename;
    }

    await bid.save();
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE BY SLUG
const deleteBidBySlug = async (req, res) => {
  try {
    const bid = await Bid.findOneAndDelete({ slug: req.params.slug });
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    if (bid.image) {
      const imgPath = path.join("uploads/bid", bid.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.status(200).json({ message: "Bid deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBid,
  getAllBids,
  getBidBySlug,
  updateBidBySlug,
  deleteBidBySlug,
};
