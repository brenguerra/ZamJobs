module.exports.fileSizeLimiter = (req, res, next) => {
  const files = req.files;
  const filesOverLimit = []

  Object.keys(files).forEach(key => {
    if(files[key].size > FILE_SIZE_LIMITER){
      filesOverLimit.push(files[key].name);
    }
  });

  if(filesOverLimit.length > 0) {
    res.status(403);
    throw new Error('Too many files or file size is too large')
  }
  
  next();
};