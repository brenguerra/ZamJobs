const uploadPhoto  = new Promise(async (resolve, reject) => {
  Object.keys(files).forEach(async (key) => {
    const filepath = path.join(__dirname, '../../','files', files[key].name);
    
    const photo = await JobPhoto.create({
      name: files[key].name,
      path: filepath,
    });

  });
});


const savePhoto  = new Promise((resolve, reject) => {
  files[key].mv(filepath, err => { 
    if(err){
      errFiles.push(files[key].name);
    }
  });
});