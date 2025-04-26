const BidDetail = require("../../models/bidDetailModel");

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
      reviews
    } = req.body;

    const image = req.file?.filename;

    const bidDetail = new BidDetail({
      title,
      description,
      minPrice,
      maxPrice,
      duration,
      rateType,
      image,
      publisher: JSON.parse(publisher || "{}"),
      packages: JSON.parse(packages || "[]"),
      bidders: JSON.parse(bidders || "[]"),
      reviews: JSON.parse(reviews || "[]")
    });

    await bidDetail.save();
    res.status(201).json(bidDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBidDetails = async (req, res) => {
  try {
    const bidDetails = await BidDetail.find();
    res.status(200).json(bidDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBidDetailById = async (req, res) => {
  try {
    const bidDetail = await BidDetail.findById(req.params.id);
    if (!bidDetail) return res.status(404).json({ message: "Bid detail not found" });
    res.status(200).json(bidDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBidDetail = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      publisher: JSON.parse(req.body.publisher || "{}"),
      packages: JSON.parse(req.body.packages || "[]"),
      bidders: JSON.parse(req.body.bidders || "[]"),
      reviews: JSON.parse(req.body.reviews || "[]")
    };

    if (req.file) updateData.image = req.file.filename;

    const bidDetail = await BidDetail.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!bidDetail) return res.status(404).json({ message: "Bid detail not found" });

    res.status(200).json(bidDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBidDetail = async (req, res) => {
  try {
    const bidDetail = await BidDetail.findByIdAndDelete(req.params.id);
    if (!bidDetail) return res.status(404).json({ message: "Bid detail not found" });
    res.status(200).json({ message: "Bid detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBidDetail,
  getAllBidDetails,
  getBidDetailById,
  updateBidDetail,
  deleteBidDetail
};
