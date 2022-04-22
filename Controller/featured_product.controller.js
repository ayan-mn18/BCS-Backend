const { Product, Featured_product } = require("../models");
const { successMessage, errorMessage } = require("../Utils/responseSender.utils");
const {path} = require("path");



const addFeaturedProduct=async (req,res,)=>{
    
    
    try{
        
        const product_id=req.params.pid
        


        const addedProduct=await Featured_product.create(
            req.body,
            {


            }
        );
        successMessage(
            res,
            "Product added",
            addedProduct,
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
    addFeaturedProduct
}