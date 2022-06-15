const bcrypt = require("bcrypt");
const { User, Cart } = require("../models");
const {
  successMessage,
  errorMessage,
} = require("../utilf/responseSender.utils");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const registeredUser = await User.create(req.body);
    //LOGIC FOR CREATNG NEW CART
    const data = {
      user_id: registeredUser._id,
      curr_user_cart: true,
    };
    const newCart = await Cart.create(data);
    registeredUser.curr_cart = newCart._id;
    await registeredUser.save();

    successMessage(res, "User registered successfully", registeredUser);
  } catch (error) {
    errorMessage(res, "Registration Unsuccessful , Please try again !", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, name, user_name } = req.user;
    const jwtUser = {
      email,
      password,
      user_name,
      name,
    };
    const accessToken = jwt.sign(jwtUser, process.env.ACCESS_TOKEN);
    const user = req.user;
    const data = {
      AccessToken: accessToken,
      user_name: user.user_name,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
    };
    successMessage(
      res,
      "Here's your auth token for login into the the app",
      {data , user}
    );
  } catch (error) {
    errorMessage(
      res,
      "Give proper credential's or try registering again !",
      error
    );
  }
};

const alluser = async (req, res) => {
  try {
    const user = await User.find();
    successMessage(res, "Messgae", user);
  } catch (error) {
    errorMessage(res, "message", error);
  }
};

// POST /create-dummy-user
// => From Frontend 
// => Create A dummmy User
// =>  

// PATCH /edit-dummy-users-detail
// => EMAIL , PASSWORD , NAME , USERNAME  

module.exports = {
  registerUser,
  loginUser,
};
