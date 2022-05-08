const express = require('express');
const { checkAuth, isAuthenticated, isAdmin } = require('../Config');
const { registerUser, loginUser, } = require('../Controller/auth.controller');
const { allUser } = require('../Controller/user.controller');
const router = express.Router();

router.post('/register' , registerUser);
router.post('/login' , checkAuth ,loginUser);
router.get('/alluser',isAuthenticated,isAdmin,allUser);


module.exports = router;