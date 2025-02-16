const { instance } = require("../configf");
const { Cart, Order, User } = require("../models");
const {
  successMessage,
  errorMessage,
} = require("../utilf/responseSender.utils");
const axios = require('axios');
const { response } = require("express");

const createOrder = async (req, res) => {
  try {
    let thisUser = await User.findById(req.user.id);
    if (!thisUser || thisUser == null) {
      return errorMessage(res, "User does not exist!!", error);
    }

    const cart_item = await Cart.findById(req.user.curr_cart);
  
    if (!cart_item || cart_item.cart_items.length == 0) {
      return errorMessage(
        res,
        "The cart is empty please add items to the cart",
        error
      );
    }

    let data = req.body;
    data.cart_id = req.user.curr_cart;
    data.user_id = req.user.id;

    const addedOrder = await Order.create(data);
    thisUser.previous_orders.push(addedOrder._id);
    // addedOrder.payment_details = instance_response;
    // await addedOrder.save();
    const cart_data = {
      user_id: thisUser._id,
      curr_user_cart: true,
    };
    cart_item.is_ordered = true;
    cart_item.curr_cart = false;

    await cart_item.save();

    const newCart = await Cart.create(cart_data);
    thisUser.curr_cart = newCart._id;
    thisUser.save();

    if( req.body.payment_method === 'COD' ) {
      const user_email = process.env.SHIPROCKET_USER;
      const user_password = process.env.SHIPROCKET_PASSWORD;
      let token;
      const response = await axios({
        method : 'post',
        url : 'https://apiv2.shiprocket.in/v1/external/auth/login',
        data : {
          email : user_email,
          password : user_password
        }
      })
      .catch(error => console.error(error));
      token = response.data.token;
      if(!token){
        throw new Error("TOken Not Found Please Try Again");
      }
      const {city , pincode , state, country, address_line_1, } = addedOrder ;
      const { email , phone , name } = thisUser ;
      let order_items = [];
      addedOrder.cart_items.map((item) =>{
        const item_data = {
          name : item.product_id.name ,
          sku : " ",
          units : item.quantity ,
          selling_price : item.featured_product_id.discounted_price ,
        }
        order_items.push(item_data);
      })
      let shipping_data = {
        "order_id": addedOrder._id,
        "order_date": Date.now(),
        "pickup_location": process.env.SHIPROCKET_PICKUP_LOCATION,
        "billing_customer_name": thisUser.name,
        "billing_city": city,
        "billing_pincode": pincode,
        "billing_state": state,
        "billing_country": country,
        "billing_email": email,
        "billing_phone": phone,
        "shipping_is_billing": true ,
        "shipping_customer_name": name ,
        "shipping_address": address_line_1,
        "shipping_city": city ,
        "shipping_pincode": pincode,
        "shipping_country": country,
        "shipping_state": state,
        "shipping_email": email,
        "shipping_phone": phone,
        "order_items": order_items,
        "payment_method": 'COD',
        "sub_total": cart_data.discounted_cart_price,
        "length": 10,
        "breadth": 10,
        "height": 10,
        "weight": 1,
    }
      console.log(shipping_data)
      const finalResponse = await axios({
        method : 'POST',
        url : 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
        Authorization : `Bearer ${token}`,
        data : shipping_data ,
      }).catch(error => console.error(error));
  
      addedOrder.shipping_response = finalResponse;
      await addedOrder.save();
    }

    successMessage(
      res,
      "Order added successfuly",
      (data = { addedOrder })
    );
  } catch (error) {
    errorMessage(
      res,
      "Please check all the parameters are given and cart id is correct",
      error
    );
  }
};

const getAllOrder = async (req, res) => {
  try {
    console.log("first")
    const orders = await Order.find();
    successMessage(res, "Orders found successfuly", data = orders);
  } catch (error) {
    errorMessage(
      res,
      "Please check all the parameters are given and cart id is correct",
      error
    );
  }
};

const getOrderById = async (req, res) => {
  try {
    const gotOrder = await Order.find({ _id: req.params.oid })
      .populate("cart_id")
      .populate("user_id");
    if (!gotOrder || !gotOrder.length) {
      return res
        .status(404)
        .json({ message: "User does not exist or cart id is incorrect" });
    }
    successMessage(res, "Product found", (data = gotOrder));
  } catch (error) {
    errorMessage(res, "User does not exist not found!!", error);
  }
};

const updateOrderById = async (req, res) => {
  try {
    let updates = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: req.params.oid },

      {
        $set: updates,
      },
      { new: true }
    );
    if (!updatedOrder) {
      return errorMessage(
        res,
        "Order can't be updated check if the Order exists or give proper credentials to udate the Order"
      );
    }
    successMessage(res, "Order Updated Successfully", updatedOrder);
  } catch (error) {
    errorMessage(res, "Order not found!! Please Check OrderId Id", error);
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const thisUser = await User.findById(req.user.id);
    if (!thisUser || thisUser == null) {
      return errorMessage(res, "Product not found!!", error);
    }
    const deletedOrder = await Order.findByIdAndDelete({ _id: req.params.oid });
    console.log(deletedOrder);
    if (!deletedOrder) {
      return res
        .status(404)
        .json({ message: "Resource not found Order Id is Not correct" });
    }
    thisUser.previous_orders.remove(deletedOrder._id);
    thisUser.save();
    successMessage(res, "Order Deleted Successfully", deletedOrder);
  } catch (error) {
    errorMessage(res, "Product not found!!", error);
  }
};

const createRazorpayOrderInstance = async (req, res) => {
  try {
    const orders = await Order.find({payment_done : true});
    let l = orders.length + 1;
    let notes = {};
    // pid , fpid , quantity for every item in the cart
    const cart_item = await Cart.findById(req.user.curr_cart);
    const instance_response = await instance.orders
      .create({
        amount: cart_item.discounted_cart_price * 100,
        currency: "INR",
        receipt: `receipt#${l}`,
        notes: notes,
        payment_capture: 1,
      })
      .catch((err) => console.log(err));

    const orderDetails = await Order.findById(req.params.oid);
    orderDetails.payment_details = instance_response;
    await orderDetails.save();

    successMessage(
      res,
      "Order Instance created successfully",
      data={orderDetails , instance_response}
    )
  } catch (error) {
    errorMessage(
      res,
      "Error While Creating THe Instance",
      error
    )
  }
}

const paynow = async (req, res) => {
  try {

    const secret = process.env.RAZORPAY_ORDER_CROSSCHECK_SECRET;
    const crypto = require("crypto");

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    

    console.log(digest, req.headers["x-razorpay-signature"]);

    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
      // process it
      //LOGIC TO UPDATE THAT PAYMENT IS DONE
      const order_id = req.body.payload.payment.entity.order_id ;
      console.log(order_id)
      const order_details = await Order.findOne({"payment_details.id" : order_id });
      order_details.payment_done = true;
      await order_details.save();
    } else {
      // pass it
      errorMessage(res, "PAYMENT NOT CAPTURED, PAY AGAIN !");
    }
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
};

const createShippingOrderCOD = async(req, res) =>{
  try {
    // const data = req.body;
    const user_email = process.env.SHIPROCKET_USER;
    const user_password = process.env.SHIPROCKET_PASSWORD;
    let token;
    const response = await axios({
      method : 'post',
      url : 'https://apiv2.shiprocket.in/v1/external/auth/login',
      data : {
        email : user_email,
        password : user_password
      }
    })
    .catch(error => console.error(error));
    token = response.data.token;
    if(!token){
      throw new Error("TOken Not Found Please Try Again");
    }
    const finalResponse = await axios({
      method : 'POST',
      url : 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
      Authorization : `Bearer ${token}`,
      data : req.body ,
    }).catch(error => console.error(error));

    const orderDetails = await Order.findById(req.body.mongoOID);
    orderDetails.shipping_response = finalResponse;
    await orderDetails.save();

    successMessage(
      res,
      "Shipping For COD is being created , Happy SHopping :)",
      data = finalResponse
    )
  } catch (error) {
    errorMessage(
      res,
      "Error in creating COD Shipping",
      error
    )
  }
}

const createShippingOrderPrepaid = async(req, res) =>{

}

// Order is created
// Two options are available 
// a) COD
// b) Pay now
// COD => Call The COD API STart the process ✅.
// Paynow => Firstly Call The paynow API to get the payment Done ✅.
//        => Then Create THe shipping ORder and get the process started ✅(kindOfNotsure).


module.exports = {
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  paynow,
  getAllOrder,
  createShippingOrderCOD,
  createRazorpayOrderInstance,
};
