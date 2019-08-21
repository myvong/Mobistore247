const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  items: {
    type: Array,
    require: true,
    default: {}
  },
  totalItems: {
    type: Number,
    require: true,
    default: 0
  },
  totalAmount: {
    type: Number,
    require: true,
    default: 0
  }
}, {
  timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;