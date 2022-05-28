const bcrypt=require('bcrypt');
const Service=require('../service/Service');
const UserModel=require('../models/user');
const { BookingModel, HotelModel, CityModel, StateModel } = require('../models');
class AdminService extends Service {

    async adminRegisterService(params){
        try{
            console.log(params);
            //Logger.info('U registration service Started for %d', params.mobileNumber);
            console.log("Registration service for admin started");
            //const timeNow =this.getDateTime(new Date());
            params.userType = 'ADMIN';
            console.log(params.phone);

            const isExist = await UserModel.findOne({ where: {"phone": params.phone } })
            if(isExist){
                throw this.fail({ message: 'User already exists', statusCode: 406 });
            }
            
            const salt= bcrypt.genSaltSync(10);
            params.password =  bcrypt.hashSync(params.password, salt);

            const newUser = await UserModel.create({ ...params});

            //Logger.info('Admin registration successfully completed for user %d', params.mobileNumber);
            console.log("completed");        
            return this.success({ statusCode: 201 });
        
        } catch (error) {
            //Logger.error(`Admin register service failed for user ${params.mobileNumber}. Error: ${error}`);
            throw (error);
        }
    }

    async adminFetchService(params){
        try{
            const {booking_id,hotel_id,user_id} = params;
            //console.log(params.cityIdFK);
            const filter = { 
                where: { }, 
                include: [ 
                    { 
                        model: BookingModel,where:{}, 
                        include:[
                            {
                            model:UserModel,where:{},attributes:{}
                            },
                            {
                                model:HotelModel,where:{},
                                include:{
                                    model:CityModel,
                                    include:{
                                        model:StateModel
                                    }
                                }
                            }
                        ]
                            
                    }], 
                attributes: [] 
            };
            
            let totalCounts;
            let data;

            console.log(booking_id);

            if(booking_id)
            {
                filter.where["booking_id"]=booking_id;
            }
            if(hotel_id)
            {
                filter.include[0].include[1].where["id"]=hotel_id;
            }
            if(user_id)
            {
                filter.include[0].include[0].where["id"]=user_id;
            }
            filter.attributes = ['booking_id','room_id','hotel_id','user_id','roomAvail']
            filter.include[0].include[0].attributes=['id','firstName','lastName','email','phone']
            
            
            //totalCounts = await HotelModel.count({where: filter.include[0].include.where});
            //console.log(filter.include[0].include.model);
            data = await BookingModel.findAll({where: filter.where, include: filter.include[0].include, attributes: filter.attributes});

            return this.success({ statusCode: 200, data });
        
        } catch (error) {
            //Logger.error(`fetch seller service failed. Error: ${error}`);
             this.fail({'message':'error found '});
            throw (error);
        }
    }
}
module.exports = new AdminService();