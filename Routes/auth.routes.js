const express = require('express');
const { checkAuth, isAuthenticated, isAdmin } = require('../Config');
const { registerUser, loginUser, alluser } = require('../Controller/auth.controller');
const router = express.Router();

router.post('/register' , registerUser);
router.post('/login' , checkAuth ,loginUser);
router.get('/alluser',isAuthenticated,isAdmin,alluser);


module.exports = router;