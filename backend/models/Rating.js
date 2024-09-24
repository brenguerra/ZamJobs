const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  contract: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  talent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
  },
  rating: {
    type: Number,
    min: [1, 'Must be at least 1, got {VALUE}'],
    max: [5, 'Only a max rating of 5 is allowed'],
  },
  text : {
    type: String,
  }
});

module.exports = new mongoose.model('Rating', ratingSchema);