const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    require: true
  },
  username: {
    type: String,
    require: true
  },
  comment: {
    type: String,
    require: true
  },
  status: {
    type: Boolean,
    require: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);