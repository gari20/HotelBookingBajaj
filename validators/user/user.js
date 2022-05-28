const { body, param, query } = require('express-validator');
const { Util } = require('../../Utils');
//const { country } = require('../config/db.config.js');


exports.userRegister = [
    //Util.bodyNotEmpty('phone').isMobilePhone(`${country}`).withMessage('mobileNumber is invalid'),
    Util.bodyNotEmpty('password'),
    Util.ValidateName("first_name"),
    //Util.ValidateStatus('status'),
]