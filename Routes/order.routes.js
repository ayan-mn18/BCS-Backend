const express = require("express");
const { isAuthenticated, isAdmin } = require("../configf");
const is_Admin = require("../configf/isAdmin.config");
const {
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  paynow,
  getAllOrder,
  createShippingOrderCOD,
} = require("../controllerf/order.controller");

const router = express.Router();

router.post("/createorder", isAuthenticated, createOrder);
router.get("/", getAllOrder);
router.post("/createorder/shipping/cod", isAuthenticated, createShippingOrderCOD);
router.post("/paynow", paynow);
router.get("/:oid", isAuthenticated, getOrderById);
router.patch("/:oid", isAuthenticated, updateOrderById);
router.delete("/:oid", isAuthenticated, deleteOrderById);

module.exports = router;
