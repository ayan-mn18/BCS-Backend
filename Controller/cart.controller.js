const { Product, Cart } = require("../models");
const { successMessage, errorMessage } = require("../Utils/responseSender.utils");
const {path} = require("path");
const { cloudinary } = require("../Utils/cloudinary");

const getCart=async (req,res,)=>{
    
    try{
        
        id=req.params.cid
        const gotCart = await Product.findById(id);

        if(!gotCart){
            return res.status(404).json({ message: "Nothing In Ca" });
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
            "Product not found!!", 
            error,
        );

    }
};


const addToCart=async (req,res,)=>{
    try{
        const product_id = req.params.pid
        

        
        const addedCart=await Cart.create(req.body);
        successMessage(
            res,
            "Product added",
            data = {
                addedProduct,
                parentProduct   
            },
        );
    }
    catch(error){
        errorMessage(
            res,
            "error",
            error,

        );

    }
}


module.exports={
    getCart,


}