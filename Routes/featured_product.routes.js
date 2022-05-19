const express = require("express");
const { isAuthenticated, isAdmin } = require("../configf");
const is_Admin = require("../configf/isAdmin.config");
const {
  addFeaturedProduct,
  getFeaturedProductById,
  updateFeaturedProductById,
  deleteFeaturedProductById,
} = require("../controller/featured_product.controller");
const { upload } = require("../Utils/multer");

const router = express.Router();

router.post(
  "/:pid",
  isAuthenticated,
  isAdmin,
  upload.array("url"),
  addFeaturedProduct
);
router.get("/:pid/:fpid", getFeaturedProductById);
router.patch(
  "/:pid/:fpid",
  isAuthenticated,
  isAdmin,
  upload.array("url"),
  updateFeaturedProductById
);
router.delete(
  "/:pid/:fpid",
  isAuthenticated,
  isAdmin,
  upload.array("url"),
  deleteFeaturedProductById
);

module.exports = router;
