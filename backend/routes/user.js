const router = require('express').Router();
const {
  getUserJobs,
  getUserProfile,
  updateAbout,
  addEducation,
  addSkills,
  getUserProfileByCategory,
  uploadUserProfilePicture,
  getTopWorkers
} = require('../controllers/user');

const fileUpload = require('express-fileupload');
const {
  filespayload,
  fileExtLimiter,
  fileSizeLimiter,
} = require('../middleware/files');


router.route('/jobs').get(getUserJobs);
router.route('/sort/').get(getTopWorkers);
router.route('/:userId').get(getUserProfile);
router.route('/:userId/about').put(updateAbout);
router.route('/:userId/education').put(addEducation);
router.route('/:userId/skills').put(addSkills);
router.route('/:userId/photos').put(
  fileUpload({createParentPath:true}),
  filespayload,
  fileSizeLimiter,
  fileExtLimiter(['.jpg', '.png', '.jpeg']),
  uploadUserProfilePicture
);

module.exports = router;