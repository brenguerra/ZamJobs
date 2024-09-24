const JobPhoto = require('../models/JobPhoto');
const savePhoto = async(file) => {
  const filepath = path.join(__dirname, '../../','files', files[key].name);
  files[key].mv(filepath, (err) => {
    if(err){
      errFiles.push(files[key].name);
      return;
    }
    const photo = new JobPhoto({
      name: files[key].name,
      path: filepath,
      url:req.protocol + '://' + req.get('host') +'/uploads/' + files[key].name,
    });
    return photo._id
  });
}


module.exports = {
  savePhoto
}


