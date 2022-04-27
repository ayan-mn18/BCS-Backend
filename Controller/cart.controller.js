const { Product, Cart, Featured_product } = require("../models");
const { successMessage, errorMessage } = require("../Utils/responseSender.utils");
const {path} = require("path");
const { cloudinary } = require("../Utils/cloudinary");


const getAllCarts=async (req,res,)=>{
    
    try{
        
        
        const gotCart = await Cart.find();

        if(!gotCart.length){
            return res.status(404).json({ message: "Nothing In Cart" });
        }

        successMessage(
            res,
            "Product Found In cart",
            gotCart,
        );
    }
    catch(error){
        errorMessage(
            res,
            "Nothing In Cart!!!", 
            error,
        );

    }
};

const getCart=async (req,res,)=>{
    
    try{
        
        id=req.params.cid
        const gotCart = await Cart.findById(id);

        if(!gotCart){
            return res.status(404).json({ message: "Nothing In Cart please check id" });
        }

        successMessage(
            res,
            "Product Found In cart",
            gotCart,
        );
    }
    catch(error){
        errorMessage(
            res,
            "Nothing In Cart!!!", 
            error,
        );

    }
};


const createCart=async (req,res,)=>{
    try{
        const prid = req.params.pid
        const product=await Product.findById(prid);
        
        
        console.log(product)
        data={
            
            "cart_items":[{
            "featured_product_id" : req.params.fpid,
            "product_id":prid,
            "quantity":req.body.quantity,
            "price_of_this_item":product.price,
            }],
            "user_id":req.user.id,
            "total_cart_price": (req.body.quantity)*(product.price),
        };
        

        
        const addedCart=await Cart.create(data);
        successMessage(
            res,
            "Cart Created successfully",
            data = addedCart,
        );
    }
    catch(error){
        errorMessage(
            res,
            "Cart Does Not Exist",
            error,

        );

    }
}
const addProductToCart=async (req,res,)=>{
    
    try{
        const prid = req.params.pid
        const product=await Product.findById(prid);
        data={
            "featured_product_id" : req.params.fpid,
            "product_id":prid,
            "quantity":req.body.quantity,
            "price_of_this_item":product.price,
            
        };
        const crid=req.params.cid;

        
        const addedcart = await Cart.findOne({
        

            _id:crid,
            product_id:req.params.pid,
            featured_product_id:req.params.fpid
         
        });
        console.log(addedcart);
        addedcart.cart_items.push(data);

        
        


        successMessage(
            res,
            "Product found",
            addedcart,
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
const deleteProductFromCart=async (req,res,)=>{
    
    try{
        const prid = req.params.pid
        const product=await Product.findById(prid);
        data={
            "featured_product_id" : req.params.fpid,
            "product_id":prid,
            "quantity":req.body.quantity,
            "price_of_this_item":product.price,
            
        };
        const crid=req.params.cid;

        
        const addedcart = await Cart.findOne({
            $and: [
            {_id:crid},
            {product_id:req.params.pid},
            {featured_product_id:req.params.fpid}
            ]
        });
        console.log(addedcart)
        
        addedcart.cart_items.pull(data)
        addedcart.save()
        
        


        successMessage(
            res,
            "Product found",
            addedcart,
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
    getCart,
    createCart,
    getAllCarts,
    addProductToCart,
    deleteProductFromCart
}