const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter a valid email address.']
  },
  address: {
    type:String,
    required: [true, 'Please enter a valid address.']
  },
  firstname : {
    type: String,
    required: [true, 'Please enter a firstname.']
  },
  status: {
    type:String,
    default:'unverified',
    required: [true, 'Please enter user status.']
  },
  lastname : {
    type: String,
    required: [true, 'Please enter a lastname.']
  },
  phone: {
    type: String,
    required: [true, 'Please enter a phone number']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.']
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
    default:null
  },
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserPhoto',
  }],
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: [true, 'User must have a role.']
  },
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  contracts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract'
  }],
}, {
  timestamps: true
});

module.exports = new mongoose.model('User', userSchema)