const { Product, Featured_product } = require("../models");
const { successMessage, errorMessage } = require("../Utils/responseSender.utils");
const {path} = require("path");
const { cloudinary } = require("../Utils/cloudinary");
const { upload } = require("../Utils/multer");



const addFeaturedProduct=async (req,res,)=>{
    
    
    try{
        //Photo Upload
        //Featured Product Add (FP Model)
        //Connect its fpid to its pid .
        //Error Handling 
        // console.log(req.file)
        // const result = await cloudinary.uploader.upload(req.file.path);
        // console.log(result)
        // if(!result){
        //     errorMessage(
        //         res,
        //         "PHOTOS DINDT UPLOAD",
        //         data = result,
        //     )
        // }
        const product_id = req.params.pid
        

        
        const addedProduct=await Featured_product.create(req.body);
        console.log(addedProduct.id)
        const parentProduct = await Product.findByIdAndUpdate(product_id , {
            $push : {'featured_product_id' : addedProduct.id}
        });
    
        if(parentProduct==null){
            errorMessage(
                res,
                "error",
                error,
    
            );

        }

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


const getFeaturedProductById=async (req,res,)=>{
    
    try{
        const prid = req.params.pid ;
        //id validity check
        

        const gotproductById=await Product.find({"_id":prid,"featured_product_id":req.params.fpid},)
        console.log(gotproductById)
        if (!gotproductById.length) {
            return res.status(404).json({ message: "Resource not found.." });
        } 
        const fid =req.params.fpid;
        const gotFeaturedProductById= await Featured_product.findById(fid);
        const getParentProduct=await Product.find({'_id':prid}).select('-featured_product_id')
        if(!gotFeaturedProductById){
            return res.status(404).json({ message: "Resource not found" });
        }
        
        const parentproduct=getParentProduct
        dataa={gotFeaturedProductById,parentproduct};
        successMessage(
            res,
            "Product found",
            data=dataa,
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

const updateFeaturedProductById=async (req,res,)=>{
    // image upload multiple
    
    try{
        const id=req.params.fpid;
        // if(req.file.path){

        // }
        //CHECK PHOTO UPDATE CODE .
        const updates=req.body;
        const options={new:true}
        const updatedProduct=await Featured_product.findByIdAndUpdate(id,updates,options);
        if (!updatedProduct){
            errorMessage(
                res,
                "Product not found!!",
                data=updatedProduct
    
            );

        }
        
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

const deleteFeaturedProductById=async (req,res,)=>{
    
    try{
        const product_id=req.params.pid;
        const fid=req.params.fpid;
        const gotproductById=await Product.find({"_id":product_id,"featured_product_id":fid},)
        
        if (!gotproductById.length) {
            return res.status(404).json({ message: "Resource not found.." });
        } 
        const parentProduct = await Product.findByIdAndUpdate(product_id , {
            $pull : {'featured_product_id' :fid}
        },{new:true});
        const deletedFeaturedProduct=await Featured_product.findByIdAndDelete(fid);
        

        if(!deleteFeaturedProductById || !parentProduct){
            return res.status(404).json({ message: "Resource not found.." });
        }


        
        successMessage(
            res,
            "Product found",
            {parentProduct,deletedFeaturedProduct},
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
    addFeaturedProduct,
    getFeaturedProductById,
    updateFeaturedProductById,
    deleteFeaturedProductById,


}