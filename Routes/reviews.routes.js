const express = require("express");
const { route } = require("express/lib/application");
const { isAuthenticated } = require("../configf");
const {
  getReviews,
  addReviews,
  getAllReviews,
  updateReview,
  checkReview,
  deleteReview,
  getReviewsByUserId,
  getReviewsByReviewId,
} = require("../controllerf/reviews.controller");

const router = express.Router();

router.post("/:pid", isAuthenticated, addReviews);
router.get("/:pid", getReviews);
router.get("/:pid/:rid", isAuthenticated, getReviewsByReviewId);
router.put("/:pid/:rid", isAuthenticated, updateReview);
router.delete("/:pid/:rid", isAuthenticated, deleteReview);
router.get("/user_reviews", isAuthenticated, getReviewsByUserId);

module.exports = router;
