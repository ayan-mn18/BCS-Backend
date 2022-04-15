const mongoose = require('mongoose');

const carts = new mongoose.Schema({
    cart_items : [{
        product_id : {

        },
        quantity : {

        },
        total_price : {

        },
        user_id : {

        }
    }],
    total_cart_price : {

    },//req

})

const Cart = mongoose.model("Cart" ,carts);

module.exports = Cart;