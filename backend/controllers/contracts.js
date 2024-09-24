const asyncHandler = require('express-async-handler');
const Contract = require('../models/Contract');
const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// only admin middleware
const listContracts = asyncHandler(async (req, res) => {
  const contracts = await Contract.find();
  res.status(200).json(contracts)
});


const addContract = asyncHandler(async (req, res) => {

  const {talentId, jobId, applicationId} = req.body;
  if(!jobId || !talentId || !applicationId) {
    res.status(400)
    throw new Error('Please fill in all fields')
  }

  const job = await Job.findById( { _id: jobId } );

  if(!job){
    res.status(404);
    throw new Error('Job not found');
  }
  const filteredContracts = job.contracts.filter(contract=>contract.status==='ongoing');
  if(filteredContracts.length >= 1){
    res.status(400);
    throw new Error('Exceeded the maximum number of contracts')
  }

  const application = await Application.findById( { _id: applicationId } );

  if(!application){
    res.status(404);
    throw new Error('Application not found');
  }

  if(req.user._id.toString() !== job.user._id.toString()) {
    res.status(403);
    throw new Error('User is not authorized');
  }

  const talent = await User.findById( { _id: talentId});

  if(!talent){
    res.status(404);
    throw new Error('User not found');
  }

  const contract = await Contract.create({
    job: job._id,
    talent: talent._id,
    application:application._id
   });

   if(contract) {
    application.status='accepted';
    job.contracts.push(contract);
    await job.save()
    await application.save()
    res.status(201).json(contract);
   } else {
    res.status(400);
    throw new Error('Contract not created');
   }
});

const terminateContract = asyncHandler(async(req,res)=> {
  const contractId = req.params.contractId;
  const contract = await Contract.findById({_id:contractId});

  if(!contract) {
    res.status(404)
    throw new Error('Contract not found');
  }
  if(contract.status === 'finished' || contract.status === 'terminated') {
    res.status(400);
    throw new Error('Contract already closed.')
  }
  contract.status = 'terminated';
  await contract.save();
  res.status(200).json(contract)
});

const deleteContract = asyncHandler(async (req, res) => {
  const contractId = req.params.contractId;
  const contract = await Contract.findById( { _id: contractId });
  if(!contract) {
    res.status(404);
    throw new Error('Contract not found');
  }
  await contract.remove();
  res.status(200).json({id:contractId});
});

const toggleContract = asyncHandler(async (req, res) => {
  const contractId = req.params.contractId;
  const contract = await Contract.findById( { _id: contractId }).populate('job');

  if(!contract) {
    res.status(404);
    throw new Error('Contract not found');
  }
  const job = await Job.findById({_id:contract.job._id});
  if(
    req.user._id.toString() !== contract.job.user._id.toString() ||
    job.user._id .toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error('User is not authorized');
  }
  job.isOpen = !job.isOpen;
  contract.isOpen = !contract.isOpen;
  contract.status = 'finished'
  await contract.save();
  await job.save();

  res.status(200).json(contract);
});

const getUserContracts = asyncHandler(async(req, res)=> {
  const userId = req.params.userId;
  const contracts = await Contract.find({talent:userId})
    .populate({
      path:'job',
      select:'title budget createdAt duration'
    })
    .populate('rating')
  res.status(200).json(contracts)
})

module.exports = {
  addContract,
  listContracts,
  toggleContract,
  deleteContract,
  terminateContract,
  getUserContracts
}