const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  talent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: [true, 'Please enter your testimonial.']
  },
});

module.exports = new mongoose.model('Testimonial', testimonialSchema);