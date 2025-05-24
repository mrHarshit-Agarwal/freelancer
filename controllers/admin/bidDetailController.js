const BidDetail = require("../../models/bidDetailModel");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

const createBidDetail = async (req, res) => {
  try {
    const {
      title,
      description,
      minPrice,
      maxPrice,
      duration,
      rateType,
      publisher,
      packages,
      bidders,
      reviews,
    } = req.body;

    const image = req.file?.filename;

    const bid = new BidDetail({
      title,
      description,
      minPrice,
      maxPrice,
      duration,
      rateType,
      image,
      publisher: publisher ? JSON.parse(publisher) : {},
      packages: packages ? JSON.parse(packages) : [],
      bidders: bidders ? JSON.parse(bidders) : [],
      reviews: reviews ? JSON.parse(reviews) : [],
    });

    await bid.save();
    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllBidDetails = async (req, res) => {
  try {
    const bids = await BidDetail.find();
    res.json(bids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBidDetailBySlug = async (req, res) => {
  try {
    const bid = await BidDetail.findOne({ slug: req.params.slug });
    if (!bid) return res.status(404).json({ error: "Bid detail not found" });
    res.json(bid);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBidDetailBySlug = async (req, res) => {
  try {
    const bid = await BidDetail.findOne({ slug: req.params.slug });
    if (!bid) return res.status(404).json({ error: "Bid detail not found" });

    const {
      title,
      description,
      minPrice,
      maxPrice,
      duration,
      rateType,
      publisher,
      packages,
      bidders,
      reviews,
    } = req.body;

    if (title) {
      bid.title = title;
      bid.slug = slugify(title, { lower: true, strict: true });
    }

    if (description) bid.description = description;
    if (minPrice) bid.minPrice = minPrice;
    if (maxPrice) bid.maxPrice = maxPrice;
    if (duration) bid.duration = duration;
    if (rateType) bid.rateType = rateType;
    if (publisher) bid.publisher = JSON.parse(publisher);
    if (packages) bid.packages = JSON.parse(packages);
    if (bidders) bid.bidders = JSON.parse(bidders);
    if (reviews) bid.reviews = JSON.parse(reviews);

    if (req.file) {
      if (bid.image) {
        const oldPath = path.join("uploads/bidDetail", bid.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      bid.image = req.file.filename;
    }

    await bid.save();
    res.json(bid);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBidDetailBySlug = async (req, res) => {
  try {
    const bid = await BidDetail.findOneAndDelete({ slug: req.params.slug });
    if (!bid) return res.status(404).json({ error: "Bid detail not found" });

    if (bid.image) {
      const imgPath = path.join("uploads/bidDetail", bid.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Bid detail deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createBidDetail,
  getAllBidDetails,
  getBidDetailBySlug,
  updateBidDetailBySlug,
  deleteBidDetailBySlug
};
