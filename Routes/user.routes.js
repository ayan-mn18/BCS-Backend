const express = require('express');
const {isAuthenticated} = require('../Config');
const is_Admin = require('../Config/isAdmin.config');

const { deleteUser, allUser, updateUser } = require('../Controller/user.controller');
const router = express.Router();

router.get('/alluser',isAuthenticated,is_Admin,allUser);
router.patch('/updateuser/:uid',isAuthenticated,is_Admin,updateUser);
router.delete('/deleteuser/:uid',isAuthenticated,is_Admin, deleteUser);

module.exports = router;