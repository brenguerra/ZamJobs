const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  isActivated: {
    type:Boolean,
    default:false
  },
  about: {
    type:String,
    default:''
  },
  workExperience: [{
    position:String,
    startYear: {
      type:String,
      required:true
    },
    endYear: {
      type:String
    }
  }],
  skills:[String],
  college: [ {
    name:{
      type:String,
      required: true,
    },
    course: String,
    yearAttended: {
      type:String,
    },
    yearGraduated: {
      type:String
    }
  }],
  highschool: [ {
    name:{
      type:String,
      required: true,
    },
    yearAttended: {
      type:String,
    },
    yearGraduated: {
      type:String
    }
  }],
  elementary: [ {
    name:{
      type:String,
      required: true,
    },
    yearAttended: {
      type:String,
    },
    yearGraduated: {
      type:String
    }
  }],
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating'
  }]
}, {timestamps:true});

module.exports = new mongoose.model('UserProfile', userProfileSchema);