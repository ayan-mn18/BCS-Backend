const { Reviews, User, Product } = require("../models");

const { successMessage, errorMessage } = require("../Utils/responseSender.utils");

const mongoose=require('mongoose');

const getReviews= async (req,res)=>{

    try{
        const id=req.params.pid;
        
        if(mongoose.Types.ObjectId.isValid(id)){
            const gotreviewById=await Reviews.find({'product_id':id}).populate('user_id').populate('product_id');
            if (!gotreviewById.length) {
                return res.status(404).json({ message: "Resource not found" });
            }
            else{
                successMessage(
                    res,
                    "Reviews Found of product",
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
        const { pid , rid }=req.params;
        const updates=req.body;
        const options={new:true}
        const updatedReview=await Reviews.findByIdAndUpdate({ "product_id":pid , _id : rid },updates,options);
        if(mongoose.Types.ObjectId.isValid(pid)){
            if(updatedReview==null){
                return res.status(404).json({ message: "Resource not found" });
            }
            else{
                successMessage(
                    res,
                    "Product Review updated Successfully",
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
        const { pid , rid } = req.params ;
        const deletedReview=await Reviews.findByIdAndDelete({'product_id' : pid , _id : rid });
        if (!deletedReview) {
            errorMessage(
                res,
                "No such product review exists"
            );
        }else{
            successMessage(
                res,
                "Product Review Deleted Successfully",
                deletedReview,
            );
        }
    }
    catch(error){
        errorMessage(
            res,
            "Product Review not found!!",
            error,

        );

    }
}
const getReviewsByUserId= async (req,res)=>{
    try{
        const id=req.user._id;
        console.log(id)
        const gotreviewById=await Reviews.find({user_id:id});
        if (!gotreviewById.length) {
            return res.status(404).json({ message: "Resource not found" });
        }
        successMessage(
            res,
            "Product Reviews found",
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

const getReviewsByReviewId = async (req,res) =>{
    try {
        const { rid , pid } = req.params;
        const review = await Reviews.findOne({'product_id' : pid , _id : rid });
        if(!review){
            errorMessage(
                res,
                "Could not find product review of the given credentials"
            )
        }
        successMessage(
            res,
            "Product review found",
            data = review,
        )
    } catch (error) {
        errorMessage(
            res,
            error,
            "Product review not found"
        )
    }
}




module.exports={
    getReviews,
    addReviews,
    updateReview,
    deleteReview,
    getReviewsByUserId,
    getReviewsByReviewId
}