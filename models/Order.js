const mongoose = require('mongoose');

const order = new mongoose.Schema({
    cart_id : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Cart',
        // autopopulate : true
    }, 
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        // autopopulate : true
    }, 
    payment_done: {
        type: Boolean,
    }, 
    payment_details: {
        type: Object,
    }, 

    
})

order.plugin(require('mongoose-autopopulate'));

const Order = mongoose.model("Order" ,order);

module.exports = Order;