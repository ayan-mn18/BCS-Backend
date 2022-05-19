const updateCartPrice = async (cart) => {
  let price = 0,
    discount_price = 0;
  cart.cart_items.forEach((item) => {
    price += item.quantity * item.price_of_this_item;
    discount_price += item.quantity * item.discounted_price_of_this_item;
  });

  cart.total_cart_price = price;
  cart.discounted_cart_price = discount_price;
  await cart.save();
  return price;
};

module.exports = updateCartPrice;
