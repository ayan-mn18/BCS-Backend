const { User } = require('../models/User');
const { successMessage, errorMessage } = require('../Utils/responseSender.utils');
const { checkAuth, isAuthenticated } = require('../Config');

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

        );

    }
}
module.exports={
    alluser,
}
