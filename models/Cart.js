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
        required : true
    },
    total_cart_price : {
        type:Number,
        required:true,
        default : 0
    },//req
    curr_user_cart : {
        type : Boolean,
        default : true,
    },
    is_ordered : {
        type :Boolean ,
        default : false ,
    }
    // --> Whenever USer regiters in the app a cart is automatically made and assigned curr_item and to that user
    // --> Whenever a user places order that cart will be associated to that order & curr_item will be assigned false and new cart will be made 
})

const Cart = mongoose.model("Cart" ,carts);

module.exports = Cart;