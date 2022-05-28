const AdminService=require('../service/AdminService');

const adminRegisterController = async (req, res, next)=> {
    try {
        //Util.checkInputError(req);
        //console.log(req.body);
        const body1 = req.body;
        //console.log(req);
        //console.log(body1);
        const response = await AdminService.adminRegisterService(req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const adminFetchController = async (req, res, next)=> {
    try {
        //Util.checkInputError(req);
        //console.log(req.body);
        const body1 = req.body;
        if(req.userType!=="ADMIN"){
            //throw UnitService.fail({ message: 'permission denied', statusCode: 401 });
            let err = new Error('Access denied');
            err.status = 400;
            err.whateverElse = "Access denied";
            throw err;
        }
        //console.log(req);
        //console.log(body1);
        const response = await AdminService.adminFetchService(req.query);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}
module.exports={adminRegisterController,adminFetchController};