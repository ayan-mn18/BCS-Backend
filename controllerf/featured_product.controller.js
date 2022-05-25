const { Product, Featured_product } = require("../models");
const {
  successMessage,
  errorMessage,
} = require("../utilf/responseSender.utils");
const { cloudinary } = require("../utilf/cloudinary");

const addFeaturedProduct = async (req, res) => {
  try {
    //Photo Upload
    //Featured Product Add (FP Model)
    //Connect its fpid to its pid .
    //Error Handling

    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await cloudinary.uploader.upload(path);
      urls.push(newPath.secure_url);
    }
    if (urls.length == 0) {
      return errorMessage(res, "Please give photos for the featured products");
    }
    let { flavour , description , ingredients , auth_code , url , discounted_price , price , benefits  } = req.body;
    url = urls;
    // const result = await cloudinary.uploader.upload(req.file.path);
    // console.log(result)
    // if(!result){
    //     errorMessage(
    //         res,
    //         "PHOTOS DINDT UPLOAD",
    //         data = result,
    //     )
    // }else{
    //     req.body.url = [result.secure_url];
    // }
    const product_id = req.params.pid;
    const check = await Product.findById(product_id);
    if (!check) {
      return res
        .status(404)
        .json({ message: "Product Does Not Exist Please check Product id" });
    }
    let newProduct ;
    
    try {
      newProduct = new Featured_product(req.body);
      const addedProduct = await newProduct.save();
    } catch (err) {
      res.status(500).json(err);
    }
    const parentProduct = await Product.findByIdAndUpdate(
      product_id,
      { $push: { featured_product_id: newProduct.id } },
      { new: true }
    ).populate("featured_product_id");
    if (parentProduct == null) {
      return errorMessage(res, "please check product Id", error);
    }

    successMessage(
      res,
      "Product added",
      (data = {
        newProduct,
        parentProduct,
      })
    );
  } catch (error) {
    errorMessage(res, "Please check credentials", error);
  }
};

const getFeaturedProductById = async (req, res) => {
  try {
    const prid = req.params.pid;
    //id validity check

    const gotproductById = await Product.find({
      _id: prid,
      featured_product_id: req.params.fpid,
    });
    console.log(gotproductById);
    if (!gotproductById.length) {
      return res.status(404).json({
        message:
          "No Featured Product Exist For Given Product id Please Check Product Id and Feature Product Id",
      });
    }
    const fid = req.params.fpid;
    const gotFeaturedProductById = await Featured_product.findById(
      fid
    ).populate("reviews");
    const getParentProduct = await Product.find({ _id: prid }).select(
      "-featured_product_id"
    );
    if (!gotFeaturedProductById) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const parentproduct = getParentProduct;
    dataa = { gotFeaturedProductById, parentproduct };
    successMessage(res, "Product found", (data = dataa));
  } catch (error) {
    errorMessage(res, "Product not found!!", error);
  }
};

const updateFeaturedProductById = async (req, res) => {
  // image upload multiple

  try {
    const id = req.params.fpid;
    // if(req.file.path){

    // }
    //CHECK PHOTO UPDATE CODE .
    if (req.files.length) {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await cloudinary.uploader.upload(path);
        urls.push(newPath.secure_url);
      }
      if (urls.length == 0) {
        return res
          .status(404)
          .json({ message: "give proper photos for featured product !" });
      }
      let data = req.body;
      data.url = urls;
    }
    const updates = req.body;
    const options = { new: true };
    const updatedProduct = await Featured_product.findByIdAndUpdate(
      id,
      updates,
      options
    );
    if (!updatedProduct) {
      return errorMessage(
        res,
        "Please Check Featured Product Id !!!",
        (data = updatedProduct)
      );
    }
    successMessage(res, "Product found", updatedProduct);
  } catch (error) {
    errorMessage(
      res,
      "Featured Product not found!! Please Check Featured Product Id and try again with proper Credentials",
      error
    );
  }
};

const deleteFeaturedProductById = async (req, res) => {
  try {
    const product_id = req.params.pid;
    const fid = req.params.fpid;
    const gotproductById = await Product.find({
      _id: product_id,
      featured_product_id: fid,
    });

    if (!gotproductById.length) {
      return res.status(404).json({ message: "Resource not found.." });
    }
    const parentProduct = await Product.findByIdAndUpdate(
      product_id,
      {
        $pull: { featured_product_id: fid },
      },
      { new: true }
    );
    const deletedFeaturedProduct = await Featured_product.findByIdAndDelete(
      fid
    );

    if (!deleteFeaturedProductById || !parentProduct) {
      return res.status(404).json({ message: "Resource not found.." });
    }

    successMessage(res, "Product found", {
      parentProduct,
      deletedFeaturedProduct,
    });
  } catch (error) {
    errorMessage(res, "Product not found!!", error);
  }
};

module.exports = {
  addFeaturedProduct,
  getFeaturedProductById,
  updateFeaturedProductById,
  deleteFeaturedProductById,
};
