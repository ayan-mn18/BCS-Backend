const express = require('express');
const { checkAuth, isAuthenticated } = require('../Config');
const { registerUser, loginUser, alluser } = require('../Controller/auth.controller');
const router = express.Router();

router.post('/register' , registerUser);
router.get('/login' , checkAuth ,loginUser);
router.get('/alluser',isAuthenticated,alluser);


module.exports = router;