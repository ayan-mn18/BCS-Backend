const express = require("express");
const { isAuthenticated, isAdmin } = require("../Config");
const is_Admin = require("../Config/isAdmin.config");
const {
  getProduct,
  addProduct,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("../Controller/product.controller");
const cloudinary = require("../utils/cloudinary");
const { upload } = require("../utils/multer");

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
