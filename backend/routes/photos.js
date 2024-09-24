
const router = require('express').Router();
const fileUpload = require('express-fileupload');
const {
  uploadJobPhotos,
  listPhotos,
  deletePhoto,
  listUserPhotos,
  getjobPhoto
} = require('../controllers/jobPhoto');

const {
  filespayload,
  fileExtLimiter,
  fileSizeLimiter,
} = require('../middleware/files');

router.post('/:jobId',
  fileUpload({createParentPath:true}),
  filespayload,
  fileSizeLimiter,
  fileExtLimiter(['.jpg', '.png', '.jpeg']),
  uploadJobPhotos
);
router.get('/users/:userId', listUserPhotos);
router.get('/jobs/primary/:jobId', getjobPhoto);
router.get('/jobs/all/:jobId', listPhotos);


router.delete('/:jobId/remove/:photoId', deletePhoto);

module.exports = router;