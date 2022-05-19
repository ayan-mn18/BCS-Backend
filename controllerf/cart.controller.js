const { Product, Cart, Featured_product } = require("../models");
const {
  successMessage,
  errorMessage,
} = require("../Utils/responseSender.utils");
const { path } = require("path");
const { cloudinary } = require("../Utils/cloudinary");
const updateCartPrice = require("../configf/checkUpdates");

const getAllCarts = async (req, res) => {
  try {
    const gotCart = await Cart.find();

    if (!gotCart.length) {
      return res.status(404).json({ message: "Nothing In Cart" });
    }

    successMessage(res, "Product Found In cart", gotCart);
  } catch (error) {
    errorMessage(res, "Nothing In Cart!!!", error);
  }
};

const getCart = async (req, res) => {
  try {
    id = req.user.curr_cart;
    const gotCart = await Cart.findById(id);

    if (!gotCart) {
      return res
        .status(404)
        .json({ message: "Nothing In Cart please check id" });
    }

    successMessage(res, "Product Found In cart", gotCart);
  } catch (error) {
    errorMessage(res, "Nothing In Cart!!!", error);
  }
};

const createCart = async (req, res) => {
  try {
    // data={

    //     "cart_items":[{
    //     "featured_product_id" : req.params.fpid,
    //     "product_id":prid,
    //     "quantity":req.body.quantity,
    //     "price_of_this_item":product.price,
    //     }],
    //     "user_id":req.user.id,
    //     "total_cart_price": (req.body.quantity)*(product.price),
    // };

    let data = req.body;
    data.user_id = req.user._id;

    const addedCart = await Cart.create(data);
    if (!addedCart) {
      return res
        .status(404)
        .json({ message: "Please provide proper credentials" });
    }
    successMessage(res, "Cart Created successfully", (data = addedCart));
  } catch (error) {
    errorMessage(res, "Error Creating the cart", error);
  }
};

const addProductToCart = async (req, res) => {
  //cart_items : []
  try {
    const prid = req.params.pid;
    const product = await Product.findById(prid);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product Does not Exist!!! Please check product Id" });
    }
    if (!req.body.quantity) {
      return res.status(404).json({ message: "Please Mention The Quantity" });
    }
    const fpid = req.params.fpid;
    const crid = req.user.curr_cart._id;

    const featured_product = await Featured_product.findById(fpid);

    const addedcart = await Cart.findById(crid);
    console.log(addedcart.cart_items);
    if (!addedcart) {
      return res
        .status(404)
        .json({ message: "Nothing In Cart please check id" });
    }
    let ans = true;
    addedcart.cart_items.forEach((item) => {
      console.log("cart");
      if (ans) {
        console.log(item.product_id._id, item.featured_product_id._id);
        if (
          item.product_id._id == prid &&
          item.featured_product_id._id == fpid
        ) {
          console.log("matched");
          item.quantity = req.body.quantity;
          ans = false;
        }
      }
    });

    if (ans) {
      console.log("first");
      data = {
        featured_product_id: fpid,
        product_id: prid,
        quantity: req.body.quantity,
        price_of_this_item: featured_product.price,
        discounted_price_of_this_item: featured_product.discounted_price,
      };
      addedcart.cart_items.push(data);
    }
    const update = await updateCartPrice(addedcart);
    // console.log(update);
    successMessage(res, "Product found", addedcart);
  } catch (error) {
    errorMessage(res, "Product not found!!", error);
  }
};

const deleteProductFromCart = async (req, res) => {
  //pull cid --> cart_items[]
  try {
    //ERROR HANDLING
    const prid = req.params.pid;
    const product = await Product.findById(prid);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product Does not Exist!!! Please check product Id" });
    }
    data = {
      featured_product_id: req.params.fpid,
      product_id: prid,
      price_of_this_item: product.price,
    };
    const crid = req.user.curr_cart;
    const pid = req.params.pid;
    const fpid = req.params.fpid;
    const cproduct = await Cart.findOneAndUpdate(
      {
        $and: [
          { _id: crid },
          { product_id: req.params.pid },
          { featured_product_id: req.params.fpid },
        ],
      },
      {
        $pull: { cart_items: { product_id: pid, featured_product_id: fpid } },
      },
      { new: true }
    );
    // await cproduct.save();
    const update = await updateCartPrice(cproduct);
    successMessage(res, "Product found", cproduct);
  } catch (error) {
    errorMessage(res, "Product not found!!", error);
  }
};

module.exports = {
  getCart,
  createCart,
  getAllCarts,
  addProductToCart,
  deleteProductFromCart,
};
