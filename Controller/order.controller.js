const { Cart, Order, User } = require("../models");
const { successMessage, errorMessage } = require("../Utils/responseSender.utils");

const createOrder = async (req, res,) => {

    try {
        let thisUser = await User.findById(req.user.id);
        if (!thisUser || thisUser == null) {
            return errorMessage(
                res,
                "User does not exist!!",
                error,
            );
        }

        let data = req.body;
        data.cart_id = req.params.cid;
        data.user_id = req.user.id;
        console.log(data,thisUser);
        const cart = await Cart.findById({"_id": req.params.cid});
        if (!cart) {
            return errorMessage(
                res,
                "Please check all the parameters are given and cart id is correct",
                error,
            );
        }

        const addedOrder = await Order.create(data);
        thisUser.previous_orders.push(addedOrder._id);
        thisUser.save()
        // order k andar wali cid -> cid.curr_cart_item = false
        // cid.ordered = true
        // logic to create new cart and assgin to req.user._id
        successMessage(
            res,
            "Order added successfuly",
            data = addedOrder,
        );
    }
    catch (error) {
        errorMessage(
            res,
            "Please check all the parameters are given and cart id is correct",
            error,
        );
    }
};
const getOrderById = async (req, res,) => {
    try {
        const gotOrder = await Order.find({ '_id': req.params.oid }).populate("cart_id").populate("user_id");
        if (!gotOrder || !gotOrder.length) {
            return res.status(404).json({ message: "User does not exist or cart id is incorrect" });
        }
        successMessage(
            res,
            'Product found',
            data = gotOrder,
        );
    }
    catch (error) {
        errorMessage(
            res,
            "User does not exist not found!!",
            error,

        );

    }
};

const updateOrderById = async (req, res,) => {

    try {
        let updates=req.body;

        

        const updatedOrder = await Order.findByIdAndUpdate({ _id: req.params.oid },

            {
                $set:  updates,
            },
            { new: true }
        );
        if (!updatedOrder) {
            return errorMessage(
                res,
                "Order can't be updated check if the Order exists or give proper credentials to udate the Order"
            );
        }
        successMessage(
            res,
            "Order Updated Successfully",
            updatedOrder,
        );
    }
    catch (error) {
        errorMessage(
            res,
            "Order not found!! Please Check OrderId Id",
            error,

        );

    }
};
const deleteOrderById = async (req, res,) => {

    try {
        const thisUser=await User.findById(req.user.id);
        if (!thisUser || thisUser==null){
            return errorMessage(
                res,
                "Product not found!!",
                error,
            );
        }
        const deletedOrder = await Order.findByIdAndDelete({"_id": req.params.oid});
        console.log(deletedOrder)
        if (!deletedOrder) {
            return res.status(404).json({ message: "Resource not found Order Id is Not correct" });
        }
        thisUser.previous_orders.remove(deletedOrder._id);
        thisUser.save();
        successMessage(
            res,
            "Order Deleted Successfully",
            deletedOrder,
        );
    }
    catch (error) {
        errorMessage(
            res,
            "Product not found!!",
            error,
        );

    }
};
module.exports = {
    createOrder,
    getOrderById,
    updateOrderById,
    deleteOrderById,
}