const AdminService=require('../service/AdminService');

const adminRegisterController = async (req, res, next)=> {
    try {
        
        const body1 = req.body;
        
        const response = await AdminService.adminRegisterService(req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const adminFetchController = async (req, res, next)=> {
    try {
        
        const body1 = req.body;
        if(req.userType!=="ADMIN"){
            
            let err = new Error('Access denied');
            err.status = 400;
            err.whateverElse = "Access denied";
            throw err;
        }
        
        const response = await AdminService.adminFetchService(req.query);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteUserController  = async (req, res, next)=> {
    try {
        
       
        if(req.userType!=="ADMIN"){
        let err = new Error('Access denied');
        err.status = 400;
        err.whateverElse = "Access denied";
        throw err;
        }
        
        const response = await AdminService.deleteUserService(req.params,req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}
module.exports={adminRegisterController,adminFetchController, deleteUserController};