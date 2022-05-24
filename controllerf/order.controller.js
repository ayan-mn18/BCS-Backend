const { instance } = require("../configf");
const { Cart, Order, User } = require("../models");
const {
  successMessage,
  errorMessage,
} = require("../utilf/responseSender.utils");

const createOrder = async (req, res) => {
  try {
    let thisUser = await User.findById(req.user.id);
    if (!thisUser || thisUser == null) {
      return errorMessage(res, "User does not exist!!", error);
    }

    const orders = await Order.find({});
    let l = orders.length + 1,
      m = 0;
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
    let data = req.body;
    data.cart_id = req.user.curr_cart;
    data.user_id = req.user.id;
    data.payment_details = instance_response;
    if (!cart_item || cart_item.cart_items.length == 0) {
      return errorMessage(
        res,
        "The cart is empty please add items to the cart",
        error
      );
    }

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
    successMessage(
      res,
      "Order added successfuly",
      (data = { addedOrder, instance_response })
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
    const orders = await Order.find({});
    successMessage(res, "Order added successfuly", (data = { orders }));
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

const paynow = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_ORDER_CROSSCHECK_SECRET;

    console.log(req.body);

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
      const order_details = await Order.findOne({"payment_details.order_id" : order_id });
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

module.exports = {
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  paynow,
  getAllOrder,
};
