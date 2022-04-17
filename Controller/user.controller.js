const { User } = require("../models");
const { errorMessage, successMessage } = require("../Utils/responseSender.utils");


const deleteUser=async (req,res)=>{
    try{
        const id=req.params.uid;
        const user=await User.findOneAndDelete({id});
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
    deleteUser,
}