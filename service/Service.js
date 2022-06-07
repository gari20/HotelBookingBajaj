const { response } = require("express");

class Service {

    success({ statusCode, token = undefined, data = [] }) {
        return {
            status: 'success',
            statusCode,
            token,
            data,
            
        };
    }

    fail({ message = "something is missing", statusCode = 500}) {
        const error = new Error(message);
        console.log(error);
        
        error.statusCode=statusCode;
        
        
        return error;
    }
}
module.exports=Service;