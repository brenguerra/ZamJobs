const asyncHandler = require('express-async-handler');
const { restart } = require('nodemon');
const Conversation = require('../models/Conversation');
const User  = require('../models/User')

const getConversations = asyncHandler(async (req,res)=>  {
  const userId = req.params.userId;

  const conversations = await Conversation.find({
    members:{$in:[userId]}
  }).populate({
    path:'messages',
    populate: {
      path:'sender',
      select:' firstname lastname',
      populate:{
        path:'photos',
        select:'url'}
    }
  }).populate({path:'members',select:' firstname lastname', populate:{path:'photos', select:'url'} });
  if(conversations) {
    res.status(200).json(conversations);
  } else {
    res.status(400);
    throw new Error('Something went wrong.');
  }
});

const findOrCreateConversation = asyncHandler(async(req, res) => {
  const userId = req.params.userId;

  if(!userId) {
    res.status(400);
    throw new Error('No user id found.');
  }

  const user = await User.findById({_id:userId});

  if(!user) {
    res.status(400);
    throw new Error('cannot find use.')
  }

  const conversation = await Conversation.findOne({
    members:{$in:[userId, req.user._id]}
  }).populate('messages').populate({path:'members',select:' firstname lastname', populate:{path:'photos', select:'url'} });

  if(!conversation) {
    const newConversation = await Conversation.create({
      members: [req.user._id, user._id]
    });
    if(!newConversation) {
      res.status(400);
      throw new Error('Something went wrong.');
    }
    res.status(201).json(newConversation);
  }
  res.status(200).json(conversation);
});

const getConversation = asyncHandler(async (req,res)=>  {
  const conversationId = req.params.conversationId;

  if(!conversationId){
    res.status(400);
    throw new Error('Enter a valid conversation ID')
  }

  const conversations = await Conversation.find({
    _id:conversationId
  }).populate('messages');

  if(conversations) {
    res.status(200).json(conversations);
  } else {
    res.status(400);
    throw new Error('Something went wrong.');
  }
});

const createConversation = asyncHandler(async (req,res)=>  {
  const {receiverId} = req.body

  if(!receiverId) {
    res.status(400);findOrCreateConversation
    throw new Error('Please fill in all fields');
  }

  const receiver = await User.findById({_id:receiverId});
  if(!receiver){
    res.status(400);
    throw new Error('Cannot find user.')
  }
  const newConversation = await Conversation.create({
    members: [req.user._id, receiver._id]
  });

  if(!newConversation) {
    res.status(400);
    throw new Error('Something went wrong.');
  }
  res.status(201).json(newConversation);
});

const deleteConversation = asyncHandler(async (req,res)=>  {
  const conversationId = req.params.conversationId;
  if(!conversationId) {
    res.status(400);
    throw new Error('Enter a valid conversation ID')
  }
  const conversation = await Conversation.findById( { _id: conversationId });

  if(!conversation) {
    res.status(404);
    throw new Error('Conversation not found');
  }

  await conversation.remove();
  res.status(200).json(testimonial);
});

module.exports = {
  getConversations,
  createConversation,
  deleteConversation,
  findOrCreateConversation
}