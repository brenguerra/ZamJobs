const User = require("../models/User");
const Job = require('../models/Job');
const asyncHandler = require('express-async-handler');

const verifyUser = asyncHandler(async(req, res)=> {
  const { userId, status } = req.body
  if(!userId || !status) {
    res.status(400);
    throw new Error('No user id given');
  }

  if(req.user.role.name !== 'admin') {
    res.status(401);
    throw new Error('User unauthorized');
  }

  if(status === 'admin' ) {
    res.status(401);
    throw new Error('Changing user status to admin is not allowed.')
  }

  const user = await User.findOne({ _id: userId });

  if( user.status === 'verified') {
    res.status(400);
    throw new Error('User already verified');
  }

  user.status = status;
  await user.save();
  res.status(200).json({user});
});

const verifyJob = asyncHandler(async(req, res)=> {
  const {jobId, status} = req.body

  if(!jobId || !status) {
    res.status(400);
    throw new Error('No job id given or status given');
  }

  if(req.user.role.name !== 'admin') {
    res.status(401);
    throw new Error('User unauthorized');
  }

  const job = await Job.findOne({ _id: jobId });


  if(job.isVeried) {
    res.status(400);
    throw new Error('Job already verified');
  }

  if (status === 'rejected') {
    job.status = 'rejected';
  } else {
    job.isVerified = true;
    job.status = 'approved';
  }
  await job.save();
  res.status(200).json({job});
});

const getUnverifiedUsers = asyncHandler(async(req,res)=> {
  if(req.user.role.name !== 'admin') {
    res.status(401);
    throw new Error('User unauthorized');
  }

  const unverfiedUsers = await User.find({ status: 'unverified' }, {
    password: 0,
    __v: 0,
  });

  res.status(200).json(unverfiedUsers)
});

const getUnverifiedJobs = asyncHandler(async(req,res)=> {
  if(req.user.role.name !== 'admin') {
    res.status(401);
    throw new Error('User unauthorized');
  }

  const unverfiedJobs = await Job.find({ isVerified:false, status: 'pending' }, {
    contracts: 0,
    offers: 0,
    updatedAt: 0,
    isOpen: 0,
    __v: 0,
  });

  res.status(200).json(unverfiedJobs)
})


module.exports = {
  verifyUser,
  verifyJob,
  getUnverifiedUsers,
  getUnverifiedJobs,
}