const router = require('express').Router();

const {
  createApplication,
  updateApplication,
  deleteApplication,
  getUserApplications,
  rejectApplication
} = require('../controllers/application')

router.post('/', createApplication);
router.get('/users/:userId', getUserApplications);
router.put('/terminate/:id', rejectApplication);
router.delete('/:id', deleteApplication);

module.exports = router;