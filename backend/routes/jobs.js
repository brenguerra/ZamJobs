const router = require('express').Router();

const {
  listJobs,
  createJob,
  updateJob,
  deleteJob,
  viewJob,
  getUserJobs
} = require('../controllers/jobs')

router.route('/').get(listJobs).post(createJob);
router.route('/user').get(getUserJobs)
router.route('/:id').put(updateJob).delete(deleteJob);
router.route('/view/:id').get(viewJob)



module.exports = router;