const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Dog', 'Cat'],  
    required: true
  },
  subcategory: {
    type: String,
    enum: ['Special', 'Normal'],  
    required: true
  },
  adopted: {
    type: String,
    enum: ['Yes', 'No'],  
    required: true
  }
});

module.exports = mongoose.model('Pet', petSchema);
