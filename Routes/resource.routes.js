const express = require("express");
const { isAuthenticated, isAdmin } = require("../config");
const {
  createResource,
  getResource,
  updateResource,
} = require("../controller/resources.controller");

const router = express.Router();

// router.post('/', isAuthenticated , isAdmin , createResource);
router.get("/", isAuthenticated, isAdmin, getResource);
router.patch("/", isAuthenticated, isAdmin, updateResource);

module.exports = router;
