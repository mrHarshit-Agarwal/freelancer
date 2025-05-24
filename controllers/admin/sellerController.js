const Seller = require('../../models/sellerModel');
const slugify = require('slugify');

const createSeller = async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    const existingSeller = await Seller.findOne({ slug });
    if (existingSeller) {
      return res.status(400).json({ success: false, message: 'Seller with this name already exists' });
    }

    const newSeller = new Seller({ name, email, contact, slug });
    await newSeller.save();

    res.status(201).json({ success: true, message: 'Seller created successfully', data: newSeller });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating seller', error: error.message });
  }
};

const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: sellers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching sellers', error: error.message });
  }
};

const getSellerBySlug = async (req, res) => {
  try {
    const seller = await Seller.findOne({ slug: req.params.slug });

    if (!seller) {
      return res.status(404).json({ success: false, message: 'Seller not found' });
    }

    res.status(200).json({ success: true, data: seller });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching seller', error: error.message });
  }
};

const updateSellerBySlug = async (req, res) => {
  try {
    const { name, email, contact } = req.body;

    const updatedSeller = await Seller.findOneAndUpdate(
      { slug: req.params.slug },
      {
        name,
        email,
        contact,
        slug: slugify(name, { lower: true, strict: true })
      },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ success: false, message: 'Seller not found' });
    }

    res.status(200).json({ success: true, message: 'Seller updated successfully', data: updatedSeller });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating seller', error: error.message });
  }
};

const deleteSellerBySlug = async (req, res) => {
  try {
    const deletedSeller = await Seller.findOneAndDelete({ slug: req.params.slug });

    if (!deletedSeller) {
      return res.status(404).json({ success: false, message: 'Seller not found' });
    }

    res.status(200).json({ success: true, message: 'Seller deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting seller', error: error.message });
  }
};

module.exports={
  createSeller,
  deleteSellerBySlug,
  getAllSellers,
  updateSellerBySlug,
  getSellerBySlug
}