const mongoose = require('mongoose');
const Featured_product = require('./Featured_product');


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
        ref: 'Featured_product',
        // autopopulate : true 
    }], 
    url: [{
        type: String,
        required: true,
    }], 
    main_url: {
        type: String,
        required: true,
        
    },
    price: {
        type:Number,
        required:true,

    }
    
})
product.plugin(require('mongoose-autopopulate'));

const Product = mongoose.model("Product" ,product);

module.exports = Product;