const { Product } = require("../models");
const { successMessage, errorMessage } = require("../Utils/responseSender.utils");

const getProduct=async (req,res,)=>{
    
    try{
        
        const gotproduct=await Product.find();
        successMessage(
            res,
            "Product found",
            gotproduct,
        );
    }
    catch(error){
        errorMessage(
            res,
            "Product not found!!",
            error,

        );

    }
}
const addProduct=async (req,res,)=>{
    
    try{
        const addedProduct=await Product.create(req.body);
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
const getProductById=async (req,res,)=>{
    
    try{
        const id=req.params.uid;
        const gotproductById=await Product.findById(id);
        successMessage(
            res,
            "Product found",
            gotproductById,
        );
    }
    catch(error){
        errorMessage(
            res,
            "Product not found!!",
            error,

        );

    }
}
const deleteProductById=async (req,res,)=>{
    
    try{
        const id=req.params.uid;
        const delProductById=await Product.findOneAndDelete({id});
        successMessage(
            res,
            "Product found",
            delProductById,
        );
    }
    catch(error){
        errorMessage(
            res,
            "Product not found!!",
            error,

        );

    }
}
const updateProductById=async (req,res,)=>{
    
    try{
        const id=req.params.uid;
        const updates=req.body;
        const options={new:true}
        const updatedProduct=await Product.findByIdAndUpdate(id,updates,options);
        successMessage(
            res,
            "Product found",
            updatedProduct,
        );
    }
    catch(error){
        errorMessage(
            res,
            "Product not found!!",
            error,

        );

    }
}




module.exports={
    getProduct,
    addProduct,
    getProductById,
    deleteProductById,
    updateProductById
    
}



