const asyncHandler = require('express-async-handler');
const Job = require('../models/Job');
const User = require('../models/User');
const Profile = require('../models/UserProfile');
const UserPhoto = require('../models/UserPhoto');
const path = require('path')
const mongoose = require('mongoose')

const getTotalUserCount = asyncHandler(async(req, res)=> {

  if(req.user.role.name!=='admin') {
    res.status(401);
    throw new Error('User unauthorized');
  }

  const userCount = await User.count();
  res.status(200).json({userCount});
});

const getUserJobs = asyncHandler(async (req, res) => {
  // const user = await User.findById({_id:req.user.id});
  if (req.user.id){
    const jobs = await Job.find({user:req.user.id}).populate('contracts').populate('offers').populate('applications');
    res.status(200).json(jobs);
  } else {
    res.status(404);
    throw new Error('User not found')
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const user = await User.findOne({_id:userId}, {
    jobs:0,
    contract:0,
    __v:0,
    password:0,
    offers:0,
    conversations:0,
    updatedAt:0,
    role:0,
  })
  .populate({
      path:'profile',
      populate:{
        path: 'ratings',
        populate: {
          path:'user',
          select:'firstname lastname -_id'
        }
      }
  })

  let sum = 0;
  if(user.profile.ratings.length !== 0) {
    user.profile.ratings.forEach(rating => {
      sum+= rating.rating
    })
  }
  const avgRating = sum/user.profile.ratings.length
  const userData={
    ...user._doc,
    avgRating
  }
  if(user){
    res.status(200).json(userData);
  } else {
    res.status(404);
    throw new Error('User not found')
  }
});

const updateAbout = asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const {aboutText} = req.body;
  const user = await User.findById({_id:userId}).populate('profile');

  if(!user) {
    res.status(404)
    throw new Error('User not found.')
  }
  const profile = await Profile.findOne({_id:user.profile});

  if(!profile) {
    res.status(404);
    throw new Error('Profile not found')
  }

  profile.about = aboutText;
  await profile.save();
  if(user){
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const addEducation = asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const {type, name, yearAttended, yearGraduated, course} = req.body.educationData
  const user = await User.findById({_id:userId}).populate('profile');

  if(!user) {
    res.status(404)
    throw new Error('User not found.')
  }

  const profile = await Profile.findOne({_id:user.profile});

  if(!profile) {
    res.status(404);
    throw new Error('Profile not found')
  }
  switch (type) {
    case 'college':
      profile.college.push({
        name,
        yearAttended,
        yearGraduated,
        course
      });
      break;
    case 'highschool':
      profile.highschool.push({
          name,
          yearAttended,
          yearGraduated,
      });
      break;
    case 'elementary':
      profile.elementary.push({
          name,
          yearAttended,
          yearGraduated,
        });
      break;
    default:
      res.status(400);
      throw new Error('Select valid type of education')
      break;
  }

  await profile.save();
  if(user){
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found')
  }
});

const addSkills = asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const {skills} = req.body;
  const user = await User.findById({_id:userId}).populate('profile');

  if(!user) {
    res.status(404)
    throw new Error('User not found.')
  }

  const profile = await Profile.findOne({_id:user.profile});

  if(!profile) {
    res.status(404);
    throw new Error('Profile not found')
  }
  profile.skills = skills;
  await profile.save();
  if(user){
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found')
  }
});

const getTopWorkers = asyncHandler(async (req, res) => {

  const profiles = await Profile.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "profile",
        as: "user",
      }
    },
    {
      $lookup: {
        from: "ratings",
        localField: "ratings",
        foreignField: "_id",
        as: "ratings",
      }
    },
    {$unwind:'$user'},
    {$unwind:'$ratings'},
    {
      $group: {
        _id:'$user._id',
        "firstname": { "$first": "$user.firstname" },
        "lastname": { "$last": "$user.lastname" },
        avgRating: {$avg:"$ratings.rating"}
      }
    },
    { $limit: 5},
    { $sort : { avgRating : -1 } }
  ]);

  res.status(200).json(profiles);
});

const getUserProfileByCategory = asyncHandler(async (req, res) => {
  const category = req.query.category
  if(!category) {
    res.status(400)
    throw new Error('Nothing to query.')
  }

  const profiles = await Profile.aggregate([
    {
      $match: {
        skills: { "$in" : [category]}
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "profile",
        as: "user",
      }
    },
    {
      $lookup: {
        from: "ratings",
        localField: "ratings",
        foreignField: "_id",
        as: "ratings",
      }
    },
    {$unwind:'$user'},
    {$unwind:'$ratings'},
    {
      $group: {
        _id:'$user._id',
        "firstname": { "$first": "$user.firstname" },
        "lastname": { "$last": "$user.lastname" },
        avgRating: {$avg:"$ratings.rating"}
      }
    },
    { $limit: 5},
    { $sort : { avgRating : -1 } }
  ]);
  res.status(200).json(profiles);
});

const getT = asyncHandler(async (req, res) => {
  const category = req.query.category
  if(!category) {
    res.status(400)
    throw new Error('Nothing to query.')
  }

  const profiles = await Profile.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "profile",
        as: "user",
      }
    },
    {
      $lookup: {
        from: "ratings",
        localField: "ratings",
        foreignField: "_id",
        as: "ratings",
      }
    },
    {$unwind:'$user'},
    {$unwind:'$ratings'},
    {
      $group: {
        _id: {"$user":"$user._id"},
        "name": { "$first": "$user.firstname" },
        "lastname": { "$last": "$user.lastname" },
        avgRating: {$avg:"$ratings.rating"}
      },
    },

    { $limit: 5},
    { $sort : { avgRating : -1 } }
  ]);

  res.status(200).json(profiles);

});

const uploadUserProfilePicture = asyncHandler( async(req, res) => {
  const id = req.params.userId;
  const user = await User.findOne( { _id:id } );
  if(!user) {
    res.status(404)
    throw new Error('User not found')
  }

  const files = req.files
  const errFiles = [];
  Object.keys(files).forEach(async (key) => {
    const filepath = path.join(__dirname, '../../', 'uploads', files[key].name);
    files[key].mv(filepath, async (err) => {
      if(err){
        errFiles.push(files[key].name);
        return;
      }
      const photo = await UserPhoto.create({
        name: files[key].name,
        path: filepath,
        url: req.protocol + '://' + req.get('host') +'/users/' + files[key].name,
      });
      user.photos.push(photo._id)
      await user.save();
    });
  });

  if(errFiles.length > 0){
    res.status(500);
    throw new Error(`Something went wrong while uploading ${errFiles}.`.replaceAll(',', ', '))
  } else {
    res.status(201).json({photos:user.photos})
  }

});


module.exports = {
  getUserJobs,
  getUserProfile,
  updateAbout,
  addEducation,
  addSkills,
  getUserProfileByCategory,
  uploadUserProfilePicture,
  getTopWorkers
}