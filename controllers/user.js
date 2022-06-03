
const UserService=require('../service/UserService');

const userRegisterController = async (req, res, next)=> {
    try {
        
       
        const response = await UserService.userRegisterService(req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const fetchHotelController = async (req, res, next) => {
    try {
        
        if(req.userType!=="USER"){
            
            let err = new Error('Access denied');
            err.status = 400;
            err.whateverElse = "Access denied";
            throw err;
        }
        
        
        const response = await UserService.fetchHotelService(req.query);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const bookHotelController = async (req, res, next)=> {
    try {
        
        
        if(req.userType!=="USER"){
            
            let err = new Error('Access denied');
            err.status = 400;
            err.whateverElse = "Access denied";
            throw err;
        }

        
        req.body.user_id=req.userId;
        
        const response = await UserService.bookHotelService(req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const loginController = async (req, res, next) => {
    try {
        
        const body = req.body;
        const response = await UserService.loginService(body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};

const getBillController=async(req,res,next)=>{
    try{

        if(req.userType!=="USER"){
            
            let err = new Error('Access denied');
            err.status = 400;
            err.whateverElse = "Access denied";
            throw err;
        }

        const response = await UserService.getBillService(req);
        res.status(response.statusCode).json(response);


          
 
    }
    catch(error){
        next(error);
    }
}
module.exports={userRegisterController,fetchHotelController,bookHotelController,loginController,getBillController};