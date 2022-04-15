const successMessage = (res , message , data , status="SUCCESS" , statusCode = 200 ) =>{
    return res.status(statusCode).json({
        status : status ,
        message : message,
        data : data 
    })
}

const errorMessage = (res , message , data , error , status="ERROR" , statusCode = 400  ) =>{
    return res.status(statusCode).json({
        status : status ,
        difficulty : error?.message ,
        message : message,
        data : data 
    })
}

module.exports = {
    successMessage,
    errorMessage,
}