
const express = require('express');
const { isAuthenticated } = require('../Config');
const { getProduct, addProduct, getProductById, deleteProductById, updateProductById } = require("../Controller/product.controller");
const router = express.Router();

router.get('/getproduct',isAuthenticated,getProduct);
router.get('/getproduct/:uid',isAuthenticated,getProductById);
router.post('/addproduct',isAuthenticated,addProduct);
router.delete('/deleteproduct/:uid',isAuthenticated,deleteProductById);
router.patch('/update/:uid',isAuthenticated,updateProductById)





module.exports = router;

