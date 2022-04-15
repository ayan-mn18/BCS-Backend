const mongoose = require('mongoose');

const order = new mongoose.Schema({
    cart_id : {
        type: String,
        required: true,
    
    }, 
    user_id: {
        type: String,
        required: true,
        
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