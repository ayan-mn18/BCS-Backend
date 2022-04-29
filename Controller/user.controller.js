const { User, Cart } = require("../models");
const { errorMessage, successMessage } = require("../Utils/responseSender.utils");


const allUser = async (req, res) => {
    try {
        console.log(req.user.id);
        const userr = await User.find().populate("previous_orders").populate("cart_items");

        successMessage(
            res,
            "Here are all the users",
            userr,
        );
    }
    catch (error) {
        errorMessage(
            res,
            "message",
            error,

        );

    }
}

const updateUser = async (req, res) => {
    try {
        const updates=req.body
        const user = await User.findByIdAndUpdate(req.params.uid,
            {$set :updates},
            {new:true});
        successMessage(
            res,
            "Messgae",
            user,
        );
    }
    catch (error) {
        errorMessage(
            res,
            "message",
            error,

        );

    }
}
const deleteUser = async (req, res) => {
    try {
        const id = req.params.uid;
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            return errorMessage(
                res,
                "user does not exist please check id",
                error,

            );
        }
        successMessage(
            res,
            "User deleted Successfully",
            user,
        );
    }
    catch (error) {
        errorMessage(
            res,
            "user does not exist please check id",
            error,

        );

    }
}
module.exports = {
    deleteUser,
    allUser,
    updateUser
}