const express = require('express');
const { checkAuth } = require('../Config');
const { registerUser, loginUser } = require('../Controller/auth.controller');
const router = express.Router();

router.post('/register' , registerUser);
router.get('/login' , checkAuth ,loginUser);

module.exports = router;