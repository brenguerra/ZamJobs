const asyncHandler = require('express-async-handler');
const Rating = require('../models/Rating');
const User = require('../models/User');
const Contract = require('../models/Contract');
const UserProfile = require('../models/UserProfile');

const listRatings = asyncHandler(async (req, res) => {
  // const { page = 1 } = req.query;
  // const { limit = 50 } = req.query;
  const ratings =  await Ratings.find();
  res.status(200).json(ratings)
});

const addRating = asyncHandler(async (req, res) => {
  const {talentId, rate, text, contractId} = req.body;
  if(!talentId || !rate || !text || !contractId) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  const contract = await Contract.findById( { _id: contractId } ).populate('job');
  const talent = await User.findById( { _id: talentId });
  const talentProfile = await UserProfile.findOne({user:talentId});

  if(!contract || !talent || !talentProfile)  {
    const msge = !contract && talent && talentProfile ? 'Contract not found.' : 'User not found.'
    res.status(404);
    throw new Error(msge);
  }

  if(contract.rating) {
    res.status(403);
    throw new Error('Contract already has a rating');
  }

  if(contract.job.user._id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Unauthorized');
  }

  const rating = await Rating.create({
    contract: contract._id,
    user: req.user._id,
    talent: talentProfile._id,
    rating: rate,
    text
  });

  if(rating){
    contract.rating = rating._id;
    await contract.save();
    talentProfile.ratings.push(rating)
    await talentProfile.save();
    res.status(201).json(rating);
  } else {
    res.status(400)
    throw new Error('Could not create new rating');
  }
});

const getRating = asyncHandler(async (req, res) => {
  const id = req.params.ratingId;
  const rating = await Rating.findById( { _id: id });
  if(!rating) {
    res.status(404)
    throw new Error('Rating not found');
  }
  res.status(200).json(rating);
});

const updateRating = asyncHandler(async (req, res) => {
  const id = req.params.ratingId;
  const rating = await Rating.findOne( { _id: id });

  if(!rating) {
    res.status(404)
    throw new Error('Rating not found');
  }

  if(rating.user._id.toString() !== req.user.id) {
    res.status(403)
    throw new Error('User is not authorized');
  }
  const {text, rate} = req.body;

  if(!text|| !rate) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  const updatedRating = await Rating.findByIdAndUpdate(id,{text, rating:rate}, {new: true})
  res.status(201).json(updatedRating);
});


const deleteRating = asyncHandler(async (req, res) => {
  const id = req.params.ratingId;
  const rating = await Rating.findOne({id});

  if(!rating) {
    res.status(400);
    throw new Error('Rating not found');
  }
  if (rating.user._id.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await rating.remove();
  res.status(204).json({id:req.params.ratingId});
});

module.exports = {
  addRating,
  getRating,
  updateRating,
  deleteRating
}