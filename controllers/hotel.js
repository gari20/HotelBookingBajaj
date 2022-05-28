const HotelService=require('../service/HotelService');

const hotelRegisterController = async (req, res, next)=> {
    try {
        //Util.checkInputError(req);
        //console.log(req.body);
        //const body1 = req.body;
       
        //console.log(req);
        //console.log(body1);
        const response = await HotelService.hotelRegisterService(req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}


const roomInfoController = async (req, res, next)=> {
    try {
        //Util.checkInputError(req);
        //console.log(req.body);
        const body1 = req.userType;
       
        if(req.userType!=="HOTEL"){
        let err = new Error('Access denied');
        err.status = 400;
        err.whateverElse = "Access denied";
        throw err;
        }
        req.body.hotelId=req.userId;
           console.log(req.userId);
        //console.log(body1);
        const response = await HotelService.roomInfoService(req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}


const hotelInfoController = async (req, res, next)=> {
    try {
        //Util.checkInputError(req);
        //console.log(req.body);
        const body1 = req.userType;
        //body1.sellerUserIdFK =  req.userId;
        //console.log(req);
        if(req.userType!=="HOTEL"){
        let err = new Error('Access denied');
        err.status = 400;
        err.whateverElse = "Access denied";
        throw err;
        }
        req.body.userId=req.userId;
           console.log(req.userType);
        //console.log(body1);
        const response = await HotelService.hotelInfoService(req.body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

    const fetchReqController = async (req, res, next)=> {
        try {
            
            const body1 = req.userType;
            
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
        
        //const body1 = req.userType;
        
        if(req.userType!=="HOTEL"){
        let err = new Error('Access denied');
        err.status = 400;
        err.whateverElse = "Access denied";
        throw err;
        }
        req.body.userId=req.userId;
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


module.exports={hotelRegisterController,roomInfoController,hotelInfoController,fetchReqController,updateController,createBill,previewBillController};