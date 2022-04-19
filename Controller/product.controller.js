const { Product } = require("../models");
const { successMessage, errorMessage } = require("../Utils/responseSender.utils");
const path = require("path");
const { cloudinary } = require("../Utils/cloudinary");


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
        
        const result=await cloudinary.v2.uploader.upload(req.file.path);
        console.log(result);

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
        const gotproductById=await Product.findById({'_id':id});
        if (!gotproductById) {
            return res.status(404).json({ message: "Resource not found" });
          }
          
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
        const delProductById=await Product.findByIdAndDelete({'_id':id});
        if (!delProductById) {
            return res.status(404).json({ message: "Resource not found" });
          }
        
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



