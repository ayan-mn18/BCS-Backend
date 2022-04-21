
const express = require('express');
const authRoutes = require('./auth.routes');
const { checkAuth, isAuthenticated } = require('../Config');
const all=require('../Controller/api.user')
const router = express.Router();
const User=require('../models/User');

router.get('/alluser',isAuthenticated,all.alluser);

module.exports = router;