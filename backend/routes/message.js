const router = require('express').Router();

const {
  getMessage,
  createMessage
} = require('../controllers/message')

// Get conversation of a user
router.get('/:messageId', getMessage);

// Create conversation
router.post('/', createMessage);

// router.put('/:id', )
// router.delete('/:id', );

module.exports = router;