const mongoose = require('mongoose');

const carts = new mongoose.Schema({
    cart_items : [{
        product_id : {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Product',
        },
        quantity : {
            type:Number,
            required:true,
            deafault:1,
            min:1,

        },
        price_of_this_item : {
            type:Number,
            required:true,
        },
        featured_product_id:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Featured_product',
        },
    }],
    user_id : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    total_cart_price : {
        type:Number,
        required:true,
    },//req

})

const Cart = mongoose.model("Cart" ,carts);

module.exports = Cart;