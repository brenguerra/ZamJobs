const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  talent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  job:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Job'
  },
  text: {
    type: String,
    required: [true, 'Please enter your offer for the project']
  },
}, {
  timestamps: true
});

module.exports = new mongoose.model('Offer', offerSchema);
