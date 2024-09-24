
const path = require('path')
const asyncHandler = require('express-async-handler');
const JobPhoto = require('../models/JobPhoto');
const Job = require('../models/Job');
const fs = require('fs');
const User = require('../models/User');

const uploadJobPhotos = asyncHandler( async (req, res) => {
  const id = req.params.jobId;
  const job = await Job.findById( { _id:id } );

  if(!job) {
    res.status(404)
    throw new Error('Job not found')
  }

  if(job.user._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Unauthorized')
  }
  const files = req.files
  const errFiles = [];
  for (const key of Object.keys(files)) {
    const filepath = path.join(__dirname, '../../','files', files[key].name);
    files[key].mv(filepath, async (err) => {
      if(err){
        errFiles.push(files[key].name);
        return;
      }
    });
    const photo = await JobPhoto.create({
      name: files[key].name,
      path: filepath,
      url:req.protocol + '://' + req.get('host') +'/uploads/' + files[key].name,
    });
    job.photos.push(photo._id)
    await job.save();
  }
  if(errFiles.length > 0){
    res.status(500);
    throw new Error(`Something went wrong while uploading ${errFiles}.`.replaceAll(',', ', '))
  } else {
    res.status(201).json({photos:job.photos})
  }
});

const deletePhoto =  asyncHandler(async (req, res) => {
  const photoId = req.params.photoId;
  const jobId = req.params.jobId;
  const photo = await JobPhoto.findById( { _id: photoId } );
  const job = await Job.findById( { _id: jobId } );
  const photoIndex = job.photos.indexOf(photoId);

  if(!photo){
    res.status(404)
    throw new Error('Photo not found');
  }

  if(!job){
    res.status(404)
    throw new Error('Job not found');
  }

  if(job.user._id.toString() !== req.user.id) {
    throw new Error('Unauthorized');
  }

  if(photoIndex > -1){
    fs.unlink(photo.path, async (err) => {

      if (err) {
        res.status(400)
        throw new Error('Something went wrong. Cannot delete photo.');
      }

      await photo.remove();
      job.photos.splice(photoIndex, 1);
      await job.save();
      res.status(204).json({id:photoId})
    });
  } else {
    res.status(400)
    throw new Error('Something went wrong. Cannot delete photo.');
  }
});

const listPhotos = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  const job = await Job.findById( { _id: jobId, } ).populate('photos');
  const photoUrls = job.photos.map(photo=>  req.protocol + '://' + req.get('host') +'/uploads/' + photo.name);
  if(job){
    res.status(200).json(photoUrls);
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
});

const listUserPhotos = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById( { _id: userId, } ).populate('photos');
  const photoUrls = user.photos.map(photo =>  req.protocol + '://' + req.get('host') +'/users/' + photo.name);
  if(user){
    res.status(200).json(photoUrls);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
})

const getjobPhoto = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  const job = await Job.findById( { _id: jobId, } ).populate('photos');
  const photoUrl =  req.protocol + '://' + req.get('host') +'/users/' + job.photos[0].name

  if(job && job.photos.length>0){
    res.status(200).json(photoUrl);
  } else {
    res.status(404);
    throw new Error('Job photos not found');
  }
})

module.exports = {
  uploadJobPhotos,
  getjobPhoto,
  deletePhoto,
  listPhotos,
  listUserPhotos
}