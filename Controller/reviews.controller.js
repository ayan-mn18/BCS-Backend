const { Reviews, User, Product } = require("../models");

const { successMessage, errorMessage } = require("../Utils/responseSender.utils");


const getAllReviews=async (req,res,)=>{
    
    try{

        
        const gotAllReviews=await Reviews.find();
        
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
        const id=req.params.pid;
        const gotreviewById=await Reviews.find({product_id:id});
        
        
        
        if (!gotreviewById) {
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
        successMessage(
            res,
            "Product updated Successfully",
            updatedReview,
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

const checkReview=async(req,res)=>{
   const alreadyAdded= await Reviews.findOne({product_id:req.params.pid})
   if (alreadyAdded==null){
       addReviews
   }
   else{
       updateReview

   }
}
const deleteReview= async (req,res,)=>{

    
    try{
        const id=req.params.pid;
        
        
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
        
        
        
        if (!gotreviewById) {
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