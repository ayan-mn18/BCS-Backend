const { Product, Cart } = require("../models");
const { successMessage, errorMessage } = require("../Utils/responseSender.utils");
const {path} = require("path");
const { cloudinary } = require("../Utils/cloudinary");


const getAllCarts=async (req,res,)=>{
    
    try{
        
        
        const gotCart = await Cart.find();

        if(!gotCart.length){
            return res.status(404).json({ message: "Nothing In Cart" });
        }

        successMessage(
            res,
            "Product Found In cart",
            gotCart,
        );
    }
    catch(error){
        errorMessage(
            res,
            "Nothing In Cart!!!", 
            error,
        );

    }
};

const getCart=async (req,res,)=>{
    
    try{
        
        id=req.params.cid
        const gotCart = await Cart.findById(id);

        if(!gotCart){
            return res.status(404).json({ message: "Nothing In Cart please check id" });
        }

        successMessage(
            res,
            "Product Found In cart",
            gotCart,
        );
    }
    catch(error){
        errorMessage(
            res,
            "Nothing In Cart!!!", 
            error,
        );

    }
};


const createCart=async (req,res,)=>{
    try{
        const prid = req.params.pid
        console.log(req.body)
        data={
            
            cart_items:[{featured_product_id : req.params.fpid,
            product_id:prid,
            quantity:req.body.quantity,
            price_of_this_item:req.body.price_of_this_item,}],
            user_id:req.user._id,
            total_cart_price: (req.body.quantity)*(req.body.price_of_this_item),
        }
        

        
        const addedCart=await Cart.create(data);
        successMessage(
            res,
            "Cart Created",
            data = addedCart,
        );
    }
    catch(error){
        errorMessage(
            res,
            "Cart Does Not Exist",
            error,

        );

    }
}


module.exports={
    getCart,
    createCart,
    getAllCarts,
}