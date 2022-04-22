const { Reviews, User, Product } = require("../models");

const { successMessage, errorMessage } = require("../Utils/responseSender.utils");

const mongoose=require('mongoose');
const getAllReviews=async (req,res,)=>{
    
    try{

        
        const gotAllReviews=await Reviews.find();
        if(gotAllReviews.length==0){
            return res.status(404).json({ message: "There Is no product Please add some product"});
        }
        
        successMessage(
            res,
            "Reviews found",
            gotAllReviews,
        );
    }
    catch(error){
        errorMessage(
            res,
            "No Review found!!",
            error,

        );

    }
}

const getReviews= async (req,res)=>{

    try{
        console.log(req.body)
        const id=req.params.pid;
        
        if(mongoose.Types.ObjectId.isValid(id)){
            const gotreviewById=await Reviews.find({'product_id':id});
            if (!gotreviewById.length) {
                return res.status(404).json({ message: "Resource not found" });
            }
            else{
                successMessage(
                    res,
                    "Product found",
                    gotreviewById,
                );
            }
        }else{
            return res.status(404).json({ message: "Resource not found" });
        }
        
    }
    catch(error){
        errorMessage(
            res,
            "Product not found!!",
            error,

        );

    }
}

const addReviews=async (req,res,)=>{
    
    try{
        

        const data={
            rating : req.body.rating,
            product_id : req.params.pid,
            user_id:req.user._id,
            review_desc:req.body.review_desc
        }
        const addedReview=await Reviews.create(
            data
        );
       
        successMessage(
            res,
            "Review Added Successfully",
            addedReview,
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
const updateReview=async (req,res,)=>{
    
    try{
        const id=req.params.pid;
        const updates=req.body;
        const options={new:true}
        const updatedReview=await Reviews.findOneAndUpdate({product_id:id},updates,options);
        if(mongoose.Types.ObjectId.isValid(id)){
            if(updatedReview==null){
                return res.status(404).json({ message: "Resource not found" });
            }
            else{
                successMessage(
                    res,
                    "Product updated Successfully",
                    updatedReview,
                );
            }
        }
    }
    catch(error){
        errorMessage(
            res,
            "Product not found!!",
            error,

        );

    }
}
const deleteReview= async (req,res,)=>{

    
    try{
        
        
        
        const deletedReview=await Reviews.findOneAndDelete({'user_id':req.user._id,product_id:req.params.pid})
        if (!deletedReview) {
            return res.status(404).json({ message: "Resource not found" });
        }

        successMessage(
            res,
            "Product Deleted Successfully",
            deletedReview,
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
const getReviewsByUserId= async (req,res)=>{
    try{
        const id=req.user._id;
        const gotreviewById=await Reviews.find({user_id:id});
        
        
        
        if (!gotreviewById.length) {
            return res.status(404).json({ message: "Resource not found" });
          }
          
        successMessage(
            res,
            "Product found",
            gotreviewById,
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
    getReviews,
    addReviews,
    getAllReviews,
    updateReview,
    deleteReview,
    getReviewsByUserId
    
}