const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    
    }, 
    details: {
        type: String,
        required: true,
        
    }, 
    weight: {
        type: String,
        required: true,
      
    }, 
    featured_product_id: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Featured_Product',
    }], 
    url: [{
        type: String,
        // required: true,
    }], 
    main_url: {
        type: String,
        // required: true,
        
    },
    price: {
        type:Number,
        required:true,

    }
    
})

const Product = mongoose.model("Product" ,product);

module.exports = Product;