const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required:true
  },
  talent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required:true
  },
  rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating',
    default: null
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  status: {
    type:String,
    default: 'ongoing'
  }
}, {timestamps: true});

module.exports = new mongoose.model('Contract', contractSchema);