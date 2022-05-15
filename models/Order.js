const mongoose = require("mongoose");

const order = new mongoose.Schema({
  cart_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Cart",
    autopopulate: true,
  },
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    autopopulate: true,
  },
  payment_done: {
    type: Boolean,
    default: false,
  },
  payment_details: {
    type: Object,
  },
  address_line_1: {
    type: String,
    // required: true
  },
  address_line_2: {
    type: String,
    // required: true
  },
  city: {
    type: String,
    // required: true
  },
  state: {
    type: String,
    // required: true
  },
  pincode: {
    type: Number,
    // required: true
  },
  phone_number: {
    type: String,
    // required: true
  },
  expected_delivery_date: {
    type: String,
    // required: true
  },
  isDelivered: {
    type: Boolean,
    default: false,
    required: true,
  },
});

order.plugin(require("mongoose-autopopulate"));

const Order = mongoose.model("Order", order);

module.exports = Order;
