
const express = require('express');
const { isAuthenticated } = require('../Config');
const { getProduct, addProduct, getProductById, deleteProductById, updateProductById } = require("../Controller/product.controller");
const cloudinary=require('../Utils/cloudinary');
const { upload } = require('../Utils/multer');

const router = express.Router();


router.get('/getproduct',isAuthenticated,getProduct);
router.get('/:uid',isAuthenticated,getProductById);
router.post('/addproduct',isAuthenticated,upload.single('image'),addProduct);
router.delete('/:uid',isAuthenticated,deleteProductById);
router.patch('/:uid',isAuthenticated,updateProductById)





module.exports = router;

