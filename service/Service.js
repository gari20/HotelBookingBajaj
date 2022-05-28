class Service {

    success({ statusCode, token = undefined, data = [], totalCounts = null }) {
        return {
            status: 'success',
            statusCode,
            token,
            data,
            totalCounts
        };
    }

    fail({ message = "Something went wrong", statusCode = 500 }) {
        const error = new Error(message);
        error.statusCode = statusCode;
        return error;
    }
}
module.exports=Service;