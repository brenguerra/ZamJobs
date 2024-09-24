const router = require('express').Router();
const {
  listContracts,
  addContract,
  deleteContract,
  terminateContract,
  toggleContract,
  getUserContracts
} = require('../controllers/contracts');

router.route('/').get(listContracts).post(addContract);
router.route('/user/:userId').get(getUserContracts);
router.route('/:contractId').put(toggleContract).delete(deleteContract)
router.route('/terminate/:contractId').put(terminateContract)

module.exports = router;