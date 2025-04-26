const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
},
  description: { 
    type: String,
    required: true
},
  urlSlug: {
    type: String,
    required: true
},
  image: { 
    type: String 
},
  status: {
    type: Boolean, 
    default: true 
},
}, { timestamps: true });

module.exports = mongoose.model("Categories", categorySchema);
