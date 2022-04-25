const express = require('express');
const { isAuthenticated, isAdmin } = require('../Config');
const is_Admin = require('../Config/isAdmin.config');
const { addFeaturedProduct, getFeaturedProductById, updateFeaturedProductById, deleteFeaturedProductById } = require('../Controller/featured_product.controller');
const { upload } = require('../Utils/multer');

const router = express.Router();




module.exports = router;