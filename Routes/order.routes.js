const express = require('express');
const { isAuthenticated, isAdmin } = require('../Config');
const is_Admin = require('../Config/isAdmin.config');
const { createOrder, getOrderById, updateOrderById, deleteOrderById } = require('../Controller/Order.controller');


const router = express.Router();

router.post('/createorder/:cid', isAuthenticated, createOrder);
router.get('/:oid', isAuthenticated, getOrderById);
router.patch("/:oid",isAuthenticated,updateOrderById);
router.delete("/:oid",isAuthenticated,deleteOrderById)


module.exports = router;