const asyncHandler = require('express-async-handler');
const Contract = require('../models/Contract');
const User = require('../models/User');
const Rating = require('../models/Rating');

const getTalentContracts = asyncHandler(async (req, res) => {
  const contracts = await Contract
    .find({talent: req.user.id})
    .populate({
      path: 'job', 
      populate:{path:'user'}
    });
  res.status(200).json(contracts)
});

const getAvailableTalents = asyncHandler(async (req, res) => {
  const role = await Role.find( { name:'talent' });
  const talents = await User.find({role:role._id});
  res.status(200).json(talents);
});



const getUserRating = asyncHandler(async (req, res) => {
  const ratingAvg = Rating.aggregate([
    { $match: { user: req.params.userId } },
    { $group: {avg_rating: {$avg:"rating.rating"}}},
    { $project: {
          "id": req.params.userId,
          "avg_rating": "$avg_rating"
      }
    }
  ]);
  res.status(200).json(ratingAvg);
});


const getInvites = asyncHandler(async (req, res) => {

});

const inviteTalent = asyncHandler(async (req, res) => {

});

// const viewInvite = asyncHandler(async (req, res) => {});
// const acceptInvite = asyncHandler(async (req, res) => {});

module.exports = {
  getTalentContracts,
  getAvailableTalents,
  getInvites,
}