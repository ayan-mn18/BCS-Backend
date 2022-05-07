const bcrypt = require('bcrypt');
const { User } = require('../models');
const { successMessage, errorMessage } = require('../Utils/responseSender.utils');
const jwt = require('jsonwebtoken');

const registerUser = async (req,res) =>{
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const registeredUser = await User.create(req.body);
        successMessage(
            res,
            "User registered successfully",
            registeredUser,
        );
    } catch (error) {
        errorMessage(
            res,
            "Registration Unsuccessful , Please try again !",
            error,
        );
    }
}

const loginUser = async (req,res) =>{
    try {
        const { email, password, name, user_name } = req.user;
        const jwtUser = {
        email,
        password,
        user_name,
        name,
        };
        console.log(req.body)
        const accessToken = jwt.sign(jwtUser, process.env.ACCESS_TOKEN);
        const user = req.user;
        const data = {
            AccessToken: accessToken,
            user_name: user.user_name,
            name: user.name,
            email: user.email,
        }
        successMessage(
            res,
            "Here's your auth token for login into the the app",
            data,
        )
    } catch (error) {
        errorMessage(
            res,
            "Give proper credential's or try registering again !",
            error,
        )
    }
}

const alluser=async (req,res)=>{
    try{
        const user=await User.find();
        successMessage(
            res,
            "Messgae",
            user,
        );
    }
    catch(error){
        errorMessage(
            res,
            "message",
            error,


module.exports = {
    registerUser,
    loginUser,
}