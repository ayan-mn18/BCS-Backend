const { Cart } = require("../models")

const updateCartPrice = async (cart_id) =>{
    const cart = await Cart.findOne({_id:cart_id});
    let price = 0;
    cart.cart_items.forEach(item => {
        price += item.quantity * item.price_of_this_item;
    });
    

    cart.total_cart_price= price;
    cart.save();
    return price;
}

module.exports = updateCartPrice;