const { validationResult, body, query, param, check } = require("express-validator");
exports.bodyNotEmpty = key => {
    return body(key).notEmpty().withMessage(`${key} field is empty`);
};

exports.ValidateName = key =>{
    return check(key).matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/).withMessage(`${key} can contain only Uppercase, lowercase and single space`)
};
