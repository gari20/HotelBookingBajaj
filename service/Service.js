class Service {

    success({ statusCode, token = undefined, data = [] }) {
        return {
            status: 'success',
            statusCode,
            token,
            data,
            
        };
    }

    fail({ message = "Something went wrong", statusCode = 500 }) {
        const error = new Error(message);
        error.statusCode = statusCode;
        return error;
    }
}
module.exports=Service;