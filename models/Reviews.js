const mongoose = require('mongoose');
const Product = require('./Product');
const User = require('./User');

const reviews = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    }, 
    review_desc: {
        type: String,
        required: true,
        
    }, 
    product_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        
      
    }, 
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      
    }, 
})

const Review = mongoose.model("Review" ,reviews);

module.exports = Review;