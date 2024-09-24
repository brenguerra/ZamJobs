const router = require('express').Router();

const {
  verifyUser,
  verifyJob,
  getUnverifiedUsers,
  getUnverifiedJobs
} = require('../controllers/admin')

router.get('/users', getUnverifiedUsers);
router.get('/jobs', getUnverifiedJobs);
router.put('/users/verify', verifyUser);
router.put('/jobs/verify/', verifyJob);

module.exports = router;