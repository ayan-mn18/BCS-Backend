const { Product, Featured_product } = require("../models");
const { path } = require("path");
const {
  successMessage,
  errorMessage,
} = require("../utils/responseSender.utils");
const { cloudinary } = require("../utils/cloudinary");

const getProduct = async (req, res) => {
  try {
    const gotproduct = await Product.find().populate("featured_product_id");

    if (!gotproduct.length) {
      return res.status(404).json({ message: "No Product Exist With This Id" });
    }

    successMessage(
      res,
      `Total of ${gotproduct.length} Products found`,
      gotproduct
    );
  } catch (error) {
    errorMessage(res, "Product not found!!", error);
  }
};

const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    let data = req.body;
    console.log(req.file);
    const url = await cloudinary.uploader.upload(req.file.path);
    data.main_url = url.secure_url;
    console.log(data);
    const addedProduct = await Product.create(data);
    successMessage(res, "Product added successfuly", (data = addedProduct));
  } catch (error) {
    errorMessage(res, "Please check all the parameters are given", error);
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.pid;
    const gotproductById = await Product.findById({ _id: id }).populate(
      "featured_product_id"
    );
    if (!gotproductById) {
      return res.status(404).json({ message: "Product Id is Incorrect" });
    }
    successMessage(res, "Product found", (data = gotproductById));
  } catch (error) {
    errorMessage(res, "Product not found!!", error);
  }
};

const deleteProductById = async (req, res) => {
  try {
    const id = req.params.pid;
    const delProductById = await Product.findByIdAndDelete({ _id: id });
    if (!delProductById) {
      return res
        .status(404)
        .json({ message: "Resource not found Product Id is Not correct" });
    }
    // If product gets Deleted we should also delete Featured Product????
    successMessage(res, "Product Deleted Successfully", delProductById);
  } catch (error) {
    errorMessage(res, "Product not found!!", error);
  }
};

const updateProductById = async (req, res) => {
  try {
    const id = req.params.pid;
    console.log(id);
    //Only 4 fields can be updated in product model.
    //-> name
    //-> weight
    //-> details
    //-> photos : url[] , main_url
    // if(req.file.path){

    // }
    //CHECK PHOTO UPDATE CODE .
    const updates = req.body;
    const urls = [];
    if (req.files) {
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await cloudinary.uploader.upload(path);
        urls.push(newPath.secure_url);
      }
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        $set: updates,
        $push: { url: urls },
      },
      { new: true }
    );
    if (!updatedProduct) {
      return errorMessage(
        res,
        "Product can't be updated check if the product exists or give proper credentials to udate the product"
      );
    }
    successMessage(res, "Product Updated Successfully", updatedProduct);
  } catch (error) {
    errorMessage(res, "Product not found!! Please Check Prodcut Id", error);
  }
};

module.exports = {
  getProduct,
  addProduct,
  getProductById,
  deleteProductById,
  updateProductById,
};
