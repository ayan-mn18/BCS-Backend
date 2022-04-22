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
        

        console.log(req.body)
        const addedProduct=await Featured_product.create(req.body);
        console.log(addedProduct.id)
        const parentProduct = await Product.findByIdAndUpdate(product_id , {
            $push : {'featured_product_id' : addedProduct.id}
        });

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
    addFeaturedProduct
}