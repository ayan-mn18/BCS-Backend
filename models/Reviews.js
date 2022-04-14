const mongoose = require('mongoose');

const reviews = new mongoose.Schema({
    review: {
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
        type: Number,
        required: true,
      
    }, 
})

const Review = mongoose.model("Review" ,reviews);

module.exports = Review;