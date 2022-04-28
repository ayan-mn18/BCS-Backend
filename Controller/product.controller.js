const { Product, Featured_product } = require("../models");

const { successMessage, errorMessage } = require("../Utils/responseSender.utils");
const { path } = require("path");
const { cloudinary } = require("../Utils/cloudinary");


const { uploader } = require('../Utils/multer');
const is_Admin = require("../Config/isAdmin.config");


const getProduct = async (req, res,) => {

    try {

        const gotproduct = await Product.find().populate('featured_product_id');

        if (!gotproduct.length) {
            return res.status(404).json({ message: "No Product Exist With This Id" });
        }

        successMessage(
            res,
            `Total of ${gotproduct.length} Products found`,
            gotproduct,
        );
    }
    catch (error) {
        errorMessage(
            res,
            "Product not found!!",
            error,
        );

    }
};

const addProduct = async (req, res,) => {

    try {

        const result = await cloudinary.uploader.upload(req.file.path);

        console.log(result);
        if (!result?.secure_url) {
            errorMessage(
                res,
                "Photo Didnt Upload , Try Again ! ",
                result,
            )
        }
        let data = req.body;
        data.main_url = result?.secure_url;
        const addedProduct = await Product.create(data);
        successMessage(
            res,
            "Product added",
            data = addedProduct,
        );
    }
    catch (error) {
        errorMessage(
            res,
            "error",
            error,
        );
    }
};


const getProductById = async (req, res,) => {

    try {
        const id = req.params.pid;
        const gotproductById = await Product.findById({ '_id': id }).populate("featured_product_id");
        if (!gotproductById) {
            return res.status(404).json({ message: "Product Id is Incorrect" });
        }
        successMessage(
            res,
            'Products found',
            data = gotproductById,
        );
    }
    catch (error) {
        errorMessage(
            res,
            "Product not found!!",
            error,

        );

    }
};

const deleteProductById = async (req, res,) => {

    try {
        const id = req.params.pid;
        const delProductById = await Product.findByIdAndDelete({ '_id': id });
        if (!delProductById) {
            return res.status(404).json({ message: "Resource not found Product Id is Not correct" });
        }
        successMessage(
            res,
            "Product Deleted Successfully",
            delProductById,
        );
    }
    catch (error) {
        errorMessage(
            res,
            "Product not found!!",
            error,
        );

    }
};

const updateProductById = async (req, res,) => {

    try {
        const id = req.params.pid;
        console.log(id)
        //Only 4 fields can be updated in product model.
        //-> name
        //-> weight
        //-> details
        //-> photos : url[] , main_url
        // if(req.file.path){

        // }
        //CHECK PHOTO UPDATE CODE .
        const updates = req.body;
        const updatedProduct = await Product.findByIdAndUpdate({ _id: id },updates,{ new: true });
        if (!updatedProduct) {
            return errorMessage(
                res,
                "Product can't be updated check if the product exists or give proper credentials to udate the product"
            );
        }
        successMessage(
            res,
            "Product Updated Successfully",
            updatedProduct,
        );
    }
    catch (error) {
        errorMessage(
            res,
            "Product not found!! Please Check Prodcut Id",
            error,

        );

    }
};




module.exports = {
    getProduct,
    addProduct,
    getProductById,
    deleteProductById,
    updateProductById
}



