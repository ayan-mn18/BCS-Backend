const { User, Cart } = require("../models");
const bcrypt = require("bcrypt");
const { errorMessage } = require("../utilf/responseSender.utils");

const checkAuth = async (req, res, next) => {
  try {
    let user , user_data , dummyPassword = '123' ;
    if(req.body.isDummy){
      const key = Math.floor(Math.random()*10000);
      user_data = {
        name : `DUMMY-${key}`,
        user_name : `DUMMY_${key*Math.floor(Math.random()*10000)}`,
        email : `dummy${key}@test.com` ,
        password : dummyPassword
      }
      user_data.password = await bcrypt.hash(dummyPassword , 10);
      user = await User.create(user_data);
      const data = {
        user_id: user._id,
        curr_user_cart: true,
      };
      const newCart = await Cart.create(data);
      user.curr_cart = newCart._id;
      await user.save();
    }else{
      user = await User.findOne({ email: req.body.email });
    }
    if (!user.id) {
      errorMessage(res, "Email ID is not registered");
    } else {
      let userLoginPassword = (req.body.password);
      console.log(userLoginPassword || dummyPassword , user.password)
      if (await bcrypt.compare((userLoginPassword).toString() || dummyPassword , user.password)) {
        req.user = user;
        next();
      } else {
        errorMessage(res, "Email and Password did not match ");
      }
    }
  } catch (error) {
    console.log(error)
    res
      .json({
        note: "Email ID and Password DID NOT MATCH",
        error : error.message
      });
  }
};

module.exports = checkAuth;