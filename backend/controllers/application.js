const asyncHandler = require('express-async-handler');
const Application = require('../models/Application');
const Contract = require('../models/Contract');
const Job = require('../models/Job');

const deleteApplication = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const applicationMatch = await Application.findOne({_id: id}).populate('job');

  if(!applicationMatch) {
    res.status(400);
    throw new Error('Application not found');
  }

  if (applicationMatch.job.user._id.toString() !== req.user._id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await applicationMatch.remove();
  res.status(204).json({id:req.params.id});
});



const createApplication = asyncHandler(async(req,res)=> {
  const {jobId, message } = req.body;

  if(!jobId || !message) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }
  const job = await Job.findOne({_id:jobId});
  if(job) {
    if(job.user._id.toString() === req.user._id.toString() ){
      res.status(401)
      throw new Error('Cannot submit an application to your own job.')
    }
    else {
      const application = await Application.create({
        job:jobId,
        talent: req.user._id,
        message
      });
      if(application) {
        job.applications.push(application._id);
        await job.save()
        res.status(201).json(application);
      } else {
        res.status(400)
        throw new Error('Something went wrong while trying to create job application.')
      }
    }
  } else {
    res.status(404);
    throw new Error('Job not found.');
  }
});

const rejectApplication = asyncHandler(async( req, res) => {
  const applicationId = req.params.id;
  const application = await Application.findById({_id:applicationId});

  if(!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  const job = await Job.findById({_id:application.job});

  if(!job) {
    res.status(400);
    throw new Error('Application is not associated with job');
  }

  if(job.user._id.toString() !== req.user._id.toString() ){
    res.status(401)
    throw new Error('Unathorized modification to job')
  }

  application.status = 'rejected';
  await application.save();
  res.status(201).json(application);
});


const getUserApplications = asyncHandler(async( req, res) => {
  const userId = req.params.userId
  const applications = await Application.find({talent:userId}).populate({
    path:'job',
    populate: {
      path:'user',
    }
  });
  console.log(applications)
  res.status(201).json(applications);
});
module.exports = {
  createApplication,
  deleteApplication,
  rejectApplication,
  getUserApplications,

}