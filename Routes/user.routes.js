const express = require("express");
const { isAuthenticated } = require("../configf");
const is_Admin = require("../configf/isAdmin.config");

const {
  deleteUser,
  allUser,
  updateUser,
  getUser,
  getUserById,
} = require("../controllerf/user.controller");
const router = express.Router();

router.get("/alluser", isAuthenticated, is_Admin, allUser);
router.get("/fetchuser", isAuthenticated, getUser);
router.get("/fetchuserbyid/:uid", isAuthenticated, getUserById);
router.patch("/updateuser", isAuthenticated, updateUser);
router.delete("/deleteuser/:uid", isAuthenticated, is_Admin, deleteUser);

module.exports = router;
