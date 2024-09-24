const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  talent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  }
});

module.exports = new mongoose.model('Invite', inviteSchema);