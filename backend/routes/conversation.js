const router = require('express').Router();

const {
  getConversations,
  createConversation,
  findOrCreateConversation
} = require('../controllers/conversation')

// Get conversation of a user
router.get('/:userId', getConversations);

//Find or create conversation
router.get('/:userId/message',findOrCreateConversation );

// Create conversation
router.post('/', createConversation);

// router.put('/:id', )
// router.delete('/:id', );

module.exports = router;