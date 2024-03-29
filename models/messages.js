const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: {
    type: 'String',
    required: true,
    trim: true,
  },
  user: {
    type: 'String',
    required: true,
    trim: true
  },
  date: {
    type: 'Date',
    default: Date.now,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Message', messageSchema);
