const HotelService=require('../service/HotelService');

const hotelRegisterController = async (req, res, next)=> {
    try {
       
        const response = await HotelService.hotelRegisterService(req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}


const roomInfoController = async (req, res, next)=> {
    try {
        
        
       
        if(req.userType!=="HOTEL"){
        let err = new Error('Access denied');
        err.status = 400;
        err.whateverElse = "Access denied";
        throw err;
        }
        req.body.hotelId=req.userId;
           
        
        const response = await HotelService.roomInfoService(req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}


const hotelInfoController = async (req, res, next)=> {
    try {
        
       
        
        if(req.userType!=="HOTEL"){
        let err = new Error('Access denied');
        err.status = 400;
        err.whateverElse = "Access denied";
        throw err;
        }
        req.body.userId=req.userId;
           
        const response = await HotelService.hotelInfoService(req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

    const fetchReqController = async (req, res, next)=> {
        try {
            
            
            
            if(req.userType!=="HOTEL"){
            let err = new Error('Access denied');
            err.status = 400;
            err.whateverElse = "Access denied";
            throw err;
            }
            
            const response = await HotelService.fetchReqService(req);
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
}

const updateController  = async (req, res, next)=> {
    try {
        
       
        if(req.userType!=="HOTEL"){
        let err = new Error('Access denied');
        err.status = 400;
        err.whateverElse = "Access denied";
        throw err;
        }
        
        const response = await HotelService.updateService(req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const createBill = async (req,res,next)=>{
    try{

        if(req.userType!=="HOTEL"){
            let err = new Error('Access denied');
            err.status = 400;
            err.whateverElse = "Access denied";
            throw err;
        }

        req.body.hotelId=req.userId;

        const response = await HotelService.createBillService(req.body);
        res.status(response.statusCode).json(response);



    }catch(err){
        next(err);
    }
}

const previewBillController= async (req,res,next)=>{
    try{

        if(req.userType!=="HOTEL"){
            let err = new Error('Access denied');
            err.status = 400;
            err.whateverElse = "Access denied";
            throw err;
        }

        const response = await HotelService.previewBillService(req);
        res.status(response.statusCode).json(response);



    }catch(err){
        next(err);
    }
}

const changeStatusController  = async (req, res, next)=> {
    try {
        
       
        if(req.userType!=="HOTEL"){
        let err = new Error('Access denied');
        err.status = 400;
        err.whateverElse = "Access denied";
        throw err;
        }
        
        const response = await HotelService.changeStatusService(req.params,req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteRoomController  = async (req, res, next)=> {
    try {
        
       
        if(req.userType!=="HOTEL"){
        let err = new Error('Access denied');
        err.status = 400;
        err.whateverElse = "Access denied";
        throw err;
        }
        
        const response = await HotelService.deleteRoomService(req.params,req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteBillController  = async (req, res, next)=> {
    try {
        
       
        if(req.userType!=="HOTEL"){
        let err = new Error('Access denied');
        err.status = 400;
        err.whateverElse = "Access denied";
        throw err;
        }
        
        const response = await HotelService.deleteBillService(req.params,req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteBookingController  = async (req, res, next)=> {
    try {
        
       
        if(req.userType!=="HOTEL"){
        let err = new Error('Access denied');
        err.status = 400;
        err.whateverElse = "Access denied";
        throw err;
        }
        
        const response = await HotelService.deleteBookingService(req.params,req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}




module.exports={hotelRegisterController,roomInfoController,hotelInfoController,fetchReqController,updateController,createBill,previewBillController,changeStatusController, deleteRoomController, deleteBillController,deleteBookingController};