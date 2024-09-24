const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  isOpen: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  status: {
    type:String,
    default: 'pending'
  },
  city: {
    type:String,
    required:true
  },
  worktype:{
    type:String,
    required:true
  },
  title: {
    type: String,
    required: [true, 'Please enter the title of the project']
  },
  description: {
    type: String,
    required: [true, 'Please enter the description of the project']
  },
  address: {
    type: String,
    required: [true, 'Please enter the location of the project']
  },
  geolocation: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  budget : {
    type: String,
    required: [true, 'Please enter the budget of the project']
  },
  duration: {
    type: String,
    required: [true, 'Please enter the duration of the project']
  },
  contracts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Contract',
    validate: [ arrayLimit, '{PATH} exceeds the limit of 1'],
  },
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPhoto'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  offers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer'
  }],
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
},
{
  timestamps: true
});

function arrayLimit(val) {
  return val.length <= 2;
}

jobSchema.index({geolocation: '2dsphere'})

module.exports = new mongoose.model('Job', jobSchema);