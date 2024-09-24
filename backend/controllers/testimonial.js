const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Testimonial = require('../models/Testimonial');


const addTestimonial = asyncHandler(async (req, res) => {
  const talentId = req.params.talentId;
  const {text} = req.body;

  if(!text) {
    res.status(400);
    throw new Error('Please enter your testimonial');
  }

  const talent = await User.findById( { _id: talentId});
  
  if(!talent) {
    res.status(404);
    throw new Error('Talent not found');
  }

  const testimonial = new Testimonial({
    text,
    talent: talent._id,
    user: req.user._id
  });

  if(!testimonial){
    res.status(400);
    throw new Error('Testimonial not created');
  }

  res.status(201).json(testimonial);
});

const removeTestimonial = asyncHandler(async (req, res) => {
  const testimonialId = req.params.testimonialId;
  const testimonial = await Testimonial.findById( { _id: testimonialId });
  if(!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }
  await testimonial.remove();
  res.status(200).json(testimonial);
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonialId = req.params.testimonialId;
  const testimonial = await Testimonial.findById( { _id: testimonialId });
  if(!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }
  if(testimonial.user._id.toString() !== req.user.id ){
    res.status(403);
    throw new Error('Unauthorized');
  }
  const updatedTestimonial = await Testimonial.findByIdAndUpdate(testimonialId, req.body,{new: true});
  res.status(200).json(testimonial);
});

const getTestimonial = asyncHandler(async (req, res) => {
  const testimonialId = req.params.testimonialId;
  const testimonial = await Testimonial.findById( { _id: testimonialId });
  if(!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }
  res.status(200).json(testimonial);
});

const getUserTestimonials = asyncHandler(async (req, res) => {

});


module.exports = {
  addTestimonial,
  removeTestimonial,
  updateTestimonial,
  getTestimonial,
  getUserTestimonials,
}