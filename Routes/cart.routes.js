const express = require('express');
const { isAuthenticated, isAdmin } = require('../Config');
const is_Admin = require('../Config/isAdmin.config');
const { getAllCarts, getCart, createCart } = require('../Controller/cart.controller');
const { upload } = require('../Utils/multer');

const router = express.Router();


router.post('/:pid/:fpid' , isAuthenticated , isAdmin , createCart );
router.get('/getallcart' , isAuthenticated  ,is_Admin, getAllCarts );
router.get('/:cid' , isAuthenticated  , getCart );



module.exports = router;