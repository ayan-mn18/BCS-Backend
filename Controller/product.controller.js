const { Product } = require("../models");
const { successMessage, errorMessage } = require("../Utils/responseSender.utils");
const {path} = require("path");
const { cloudinary } = require("../Utils/cloudinary");


const {uploader} =require('../Utils/multer');
const is_Admin = require("../Config/isAdmin.config");


const getProduct=async (req,res,)=>{
    
    try{
        
        const gotproduct = await Product.find();

        if(gotproduct.length==0){
            errorMessage(
                res,
                "THERE ARE NO PRODUCTS IN THE DATABASE",
                data = gotproduct,
            )
        }

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
};

const addProduct=async (req,res,)=>{
    
    try{
        
        const result = await cloudinary.uploader.upload(req.file.path);

        console.log(result);
        if(!result?.secure_url){
            errorMessage(
                res,
                "Photo Didnt Upload , Try Again ! ",
                result,
            )
        }
        let data = req.body;
        data.main_url = result?.secure_url ;
        const addedProduct = await Product.create(data);
        successMessage(
            res,
            "Product added",
            data = addedProduct,
        );
    }
    catch(error){
        errorMessage(
            res,
            "error",
            error,
        );
    }
};

const getProductById=async (req,res,)=>{
    
    try{
        const id = req.params.pid ;
        const gotproductById=await Product.findById({'_id':id});
        if (!gotproductById) {
            errorMessage(
                res,
                `DINNT FIND ANY PRODUCT WITH PRODUCT ID ${id}`,
                data = gotproductById ,
            )
        }
        successMessage(
            res,
            "Product found",
            data = gotproductById,
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

const deleteProductById=async (req,res,)=>{
    
    try{
        const id=req.params.pid;
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
};

const updateProductById=async (req,res,)=>{
    
    try{
        const id=req.params.pid;
        // if(req.file.path){

        // }
        //CHECK PHOTO UPDATE CODE .
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
};




module.exports={
    getProduct,
    addProduct,
    getProductById,
    deleteProductById,
    updateProductById
}



