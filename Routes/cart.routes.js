const express = require('express');
const { isAuthenticated, isAdmin } = require('../Config');
const is_Admin = require('../Config/isAdmin.config');
const { getAllCarts, getCart, createCart, addProductToCart, deleteProductFromCart } = require('../Controller/cart.controller');
const { upload } = require('../Utils/multer');

const router = express.Router();


router.post('/:pid/:fpid' , isAuthenticated , createCart );
router.get('/getallcart' , isAuthenticated  ,is_Admin, getAllCarts );
router.get('/:cid' , isAuthenticated  , getCart );
router.post('/add/:pid/:fpid/:cid' , isAuthenticated  , addProductToCart );
router.post('/:pid/:fpid/:cid/remove' , isAuthenticated  , deleteProductFromCart );



module.exports = router;