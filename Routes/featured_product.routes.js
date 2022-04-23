const express = require('express');
const { route } = require('express/lib/application');
const { isAuthenticated, isAdmin } = require('../Config');
const is_Admin = require('../Config/isAdmin.config');
const { addFeaturedProduct, getFeaturedProductById, updateFeaturedProductById } = require('../Controller/featured_product.controller');
const { deleteProductById } = require('../Controller/product.controller');
const { upload } = require('../Utils/multer');

const router = express.Router();

router.post('/:pid' , isAuthenticated , isAdmin , addFeaturedProduct );
router.get('/:pid/:fpid' , isAuthenticated , isAdmin , getFeaturedProductById );
router.patch('/:pid/:fpid',isAuthenticated,isAdmin,updateFeaturedProductById);
router.delete('/:pid/:fpid',isAuthenticated,isAdmin,deleteProductById);


module.exports = router;

