const express = require('express');
const { route } = require('express/lib/application');
const { isAuthenticated } = require('../Config');
const { getReviews, addReviews, getAllReviews, updateReview, checkReview, deleteReview, getReviewsByUserId } = require('../Controller/reviews.controller');

const router = express.Router();


router.post('/:pid',isAuthenticated,addReviews);
router.get("/getall",isAuthenticated,getAllReviews);
router.get("/:pid",isAuthenticated,getReviews);
router.put("/:pid",isAuthenticated,updateReview);
router.delete('/:pid',isAuthenticated,deleteReview);
router.get('/getalluser/:pid',isAuthenticated,getReviewsByUserId);




module.exports = router;