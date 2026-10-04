function successResponse(res,data,statusCode,message=null){
    const response = {
        status: 'success',
        message: message,
        data: data
    }

    if(message){
        response.message = message;
    }

   res.status(statusCode).json(response);
}

function errorResponse(res,statusCode,message=null){
    const response = {
        status: 'error',
        message: message
    }

    if(message){
        response.message = message;
    }

   res.status(statusCode).json(response);
}

module.exports = {
    successResponse,
    errorResponse
}