const express = require("express");
const { checkAuth, isAuthenticated, isAdmin } = require("../configf");
const { registerUser, loginUser } = require("../controllerf/auth.controller");
const { allUser } = require("../controllerf/user.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", checkAuth, loginUser);
router.get("/alluser", isAuthenticated, isAdmin, allUser);

module.exports = router;
