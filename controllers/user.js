const { body } = require('express-validator');
const UserService=require('../service/UserService');

const userRegisterController = async (req, res, next)=> {
    try {
        //Util.checkInputError(req);
        //console.log(req.body);
        const body1 = req.body;
        //console.log(req);
        //console.log(body1);
        const response = await UserService.userRegisterService(req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const fetchHotelController = async (req, res, next) => {
    try {
        //Util.checkInputError(req);
        //console.log(req.userType);
        if(req.userType!=="USER"){
            //throw UnitService.fail({ message: 'permission denied', statusCode: 401 });
            let err = new Error('Access denied');
            err.status = 400;
            err.whateverElse = "Access denied";
            throw err;
        }
        //console.log(req.query.cityIdFk);
        
        const response = await UserService.fetchHotelService(req.query);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const bookHotelController = async (req, res, next)=> {
    try {
        //Util.checkInputError(req);
        //console.log(req.body);
        const body1 = req.body;
        if(req.userType!=="USER"){
            //throw UnitService.fail({ message: 'permission denied', statusCode: 401 });
            let err = new Error('Access denied');
            err.status = 400;
            err.whateverElse = "Access denied";
            throw err;
        }

        //console.log(req);
        //console.log(body1);
        //console.log(req);
        req.body.user_id=req.userId;
        //req.body.user_id=req.userId;
        const response = await UserService.bookHotelService(req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const loginController = async (req, res, next) => {
    try {
        //Util.checkInputError(req);
        const body = req.body;
        const response = await UserService.loginService(body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};
module.exports={userRegisterController,fetchHotelController,bookHotelController,loginController};