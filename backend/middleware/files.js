const path = require('path')
const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const filespayload = (req, res, next) => {
  if(!req.files) {
    res.status(400)
    throw new Error('Please upload a photo')
  }
  next();
}


const fileSizeLimiter = (req, res, next) => {
  const files = req.files;
  const filesOverLimit = []

  Object.keys(files).forEach(key => {
    if(files[key].size > FILE_SIZE_LIMIT){
      filesOverLimit.push(files[key].name);
    }
  });

  if(filesOverLimit.length > 0) {
    res.status(403);
    throw new Error('Too many files or file size is too large')
  }

  next();
};

const fileExtLimiter = (allowedEXTArray) => {
  return (req, res, next) => {
    const files = req.files;
    const fileEXT = [];

    Object.keys(files).forEach(key => {
      fileEXT.push(path.extname(files[key].name))
    });

    const allowed = fileEXT.every(ext=>allowedEXTArray.includes(ext));
    if(!allowed) {
      res.status(400);
      throw new Error('Only .jpg, .png and .jpeg files are allowed')
    }
    next();
  }
}

module.exports = {
  filespayload,
  fileExtLimiter,
  fileSizeLimiter,
}