const mongoose = require('mongoose');

const homeSliderSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: Boolean, default: 1 },
  image: String,
});

const subSliderSchema = new mongoose.Schema({
  image: String,
  status: { type: Boolean, default: 1 },
});

const categorySchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: Boolean, default: 1 },
  image: String,
  urlSlug: String,
});

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: Boolean, default: 1 },
  image: String,
});



const HomeSlider = mongoose.model('HomeSlider', homeSliderSchema);
const SubSlider = mongoose.model( 'SubSlider', subSliderSchema);
const Category = mongoose.model('Category', categorySchema);
const Service = mongoose.model('Service', serviceSchema);

module.exports = {
  HomeSlider,
  SubSlider,
  Category,
  Service,
};
