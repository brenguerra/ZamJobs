const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

const getMessage = asyncHandler(async(req,res)=> {
});

const createMessage = asyncHandler(async(req,res)=> {
  const {text, conversationId} = req.body;
  const conversation = await Conversation.findOne({_id:conversationId});
  if(!conversation) {
    res.status(400);
    throw new Error('Conversation not found');
  }

  const newMessage = await  Message.create({
    text,conversation:conversation._id, sender: req.user._id
  });

  if(newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
    res.status(201).json(newMessage);
  } else {
    res.status(400);
    throw new Error('Message not sent')
  }

});

const deleteMessage = asyncHandler(async(req,res)=> {

});

module.exports = {
  getMessage,
  createMessage,
  deleteMessage
}