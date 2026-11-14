const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand:{
    type: String,
    trim: true,
  },
  author:{
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  oldPrice:{
    type: Number,
    min:0,
  },
  image:{
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  rating: {
      rate:{
        type: Number,
        default:0,
        min:0,
        max:5,
      },

      count:{
        type: Number,
        default:0,
        min:0,
      },
  },


  reviewCount: {
    type: Number,
    default: 0,
    min:0,
  },


  stock: {
    type: Number,
    default: 0,
    min: 0
  },

  condition: {
    type: String,
    default: 'new',
    trim: true,
  },

  freeDelivery:{
    type: Boolean,
    default: true,
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('Product', productSchema);