const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A project must have a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A project must have a description']
  },
  location: {
    type: String,
    required: [true, 'Please specify the project location']
  },
  imageUrl: {
    type: String,
    required: [true, 'An image link from Cloudinary is required']
  },
  imagePublicId: {
    type: String,
    required: [true, 'Cloudinary image ID tracking reference is required']
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A project must be linked to an admin account']
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
