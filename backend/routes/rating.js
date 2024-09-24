const router = require('express').Router();
const {
  addRating,
  getRating,
  updateRating,
  deleteRating
} = require('../controllers/rating');


router.route('/').post(addRating);
router.route('/:ratingId')
  .get(getRating)
  .put(updateRating)
  .delete(deleteRating);

module.exports = router;