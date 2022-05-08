const mongoose = require('mongoose');

const featured_product = new mongoose.Schema({
    flavour: {
        type: String,
        required: true,
    
    }, 
    description: {
        type: String,
        required: true,
        
    },
    ingredients: {
        type: String,
        required: true,
    }, 
    auth_code: {
        type: String,
        required: true,
    }, 
    reviews: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Review',
        // autopopulate : true
    }], 
    url: [{
        type: String,
        // required: true,
    }], 
    
})
featured_product.plugin(require('mongoose-autopopulate'));

const Featured_product = mongoose.model("Featured_product" ,featured_product);

module.exports = Featured_product;