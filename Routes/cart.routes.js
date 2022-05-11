const express = require('express');
const { isAuthenticated, isAdmin } = require('../Config');
const is_Admin = require('../Config/isAdmin.config');
const { getAllCarts, getCart, createCart, addProductToCart, deleteProductFromCart } = require('../Controller/cart.controller');
const { upload } = require('../Utils/multer');

const router = express.Router();


router.post('/create' , isAuthenticated , createCart );
router.get('/getallcart' , isAuthenticated  ,is_Admin, getAllCarts );
router.get('/getcart' , isAuthenticated  , getCart );
router.patch('/:pid/:fpid/add' , isAuthenticated  , addProductToCart );
router.patch('/:pid/:fpid/remove' , isAuthenticated  , deleteProductFromCart );



module.exports = router;