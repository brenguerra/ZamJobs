const router = require('express').Router();
const { listOffers, getOffer, addOffer, updateOffer, deleteOffer } = require('../controllers/offer');
const Offer = require('../models/Offer')

router.route('/').get(listOffers).post(addOffer);
router.route('/:offerId')
  .get(getOffer)
  .put(updateOffer)
  .delete(deleteOffer);

module.exports = router;