const mongoose = require('mongoose');

const blogDetailSchema = new mongoose.Schema({

  title: { 
    type: String, 
    required: true 
},
  date: { type: String, 
    required: true 
},
  commentCount: { 
    type: Number, 
    default: 0 
},
  image: { 
    type: String, 
    required: true 
},
  description1: {
     type: String 
    },
  description2: {
     type: String 
    },
  status: { 
    type: Boolean,
     default: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('BlogDetail', blogDetailSchema);
