const express = require("express");
const { isAuthenticated, isAdmin } = require("../configf");
const is_Admin = require("../configf/isAdmin.config");
const {
  getProduct,
  addProduct,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("../controllerf/product.controller");
const cloudinary = require("../utilf/cloudinary");
const { upload } = require("../utilf/multer");

const router = express.Router();

router.get("/getproduct", getProduct);
router.get("/:pid", getProductById);
router.post(
  "/addproduct",
  isAuthenticated,
  is_Admin,
  upload.single("url"),
  addProduct
);
router.delete("/:pid", isAuthenticated, is_Admin, deleteProductById);
router.patch(
  "/:pid",
  isAuthenticated,
  is_Admin,
  upload.array("url"),
  updateProductById
);

module.exports = router;
