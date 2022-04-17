const express = require('express');
const { checkAuth, isAuthenticated } = require('../Config');
const { registerUser, loginUser, alluser } = require('../Controller/auth.controller');
const { deleteUser } = require('../Controller/user.controller');
const router = express.Router();

router.delete('/deleteuser/:uid',isAuthenticated,deleteUser)

module.exports = router;