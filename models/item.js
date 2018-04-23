const mongoose = require('mongoose');

const Item = mongoose.model('Item', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  modifiedAt: {
    type: Number
  },
  price: {
    type: Number,
    default: 0
  },
  price1: {
    type: Number,
    default: 0
  },
  price2: {
    type: Number,
    default: 0
  },
  price3: {
    type: Number,
    default: 0
  },
  price4: {
    type: Number,
    default: 0
  },
  provider: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    default: 0
  }
});

module.exports = {
  Item
};
