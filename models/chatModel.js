const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  senderId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true
},
  receiverId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true 
},
  message: { 
    type: String, 
    required: true 
},
  timestamp: { 
    type: Date, 
    default: Date.now 
},
  image: { 
    type: String
 }
});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
