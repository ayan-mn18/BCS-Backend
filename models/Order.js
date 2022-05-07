const mongoose = require('mongoose');

const order = new mongoose.Schema({
    cart_id : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Cart',
    }, 
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    }, 
    payment_done: {
        type: Boolean,
    }, 
    payment_details: {
        type: String,
    }, 

    
})

const Order = mongoose.model("Order" ,order);

module.exports = Order;