const mongoose = require("mongoose");
const slugify = require("slugify");

const chatMessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
});

chatMessageSchema.pre("save", function (next) {
  if (this.isModified("message") || this.isNew) {
    const timePart = new Date().getTime();
    this.slug = slugify(this.message.substring(0, 10) + "-" + timePart, {
      lower: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
