const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  aboutTitle: { 
    type: String, 
    required: true
 },
  aboutDescription: { 
    type: String, 
    required: true 
},
  whatWeDoTitle: { 
    type: String, 
    required: true 
},
  whatWeDoDescription: { 
    type: String, 
    required: true 
},
  weDoDifferentlyTitle: {
     type: String,
      required: true
     },
  totalFreelancers: {
     type: String 
    },
  positiveReviews: {
     type: String 
    },
  projectsCompleted: {
     type: String 
    },
  satisfiedUsers: {
     type: String 
    },
  testimonial: [
    {
      name: String,
      position: String,
      message: String,
      image: String,
    }
  ],
  images: [
    {
      type: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
