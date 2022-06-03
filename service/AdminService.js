const bcrypt=require('bcrypt');
const Service=require('../service/Service');
const UserModel=require('../models/user');
const { BookingModel, HotelModel, CityModel, StateModel } = require('../models');
class AdminService extends Service {

    async adminRegisterService(params){
        try{
            
            console.log("Registration service for admin started");
            
            params.userType = 'ADMIN';
            

            const isExist = await UserModel.findOne({ where: {"phone": params.phone } })
            if(isExist){
                throw this.fail({ message: 'User++ already exists', statusCode: 406 });
            }
            
            const salt= bcrypt.genSaltSync(10);
            params.password =  bcrypt.hashSync(params.password, salt);

            const newUser = await UserModel.create({ ...params});

            
            console.log("completed");        
            return this.success({ statusCode: 201 });
        
        } catch (error) {
            
            throw (error);
        }
    }

    async adminFetchService(params){
        try{
            const {booking_id,hotel_id,user_id} = params;
            
            const filter = { 
                where: { }, 
                include: [ 
                    { 
                        model: BookingModel,where:{}, 
                        include:[
                            {
                            model:UserModel,where:{},attributes:{}
                            },
                            
                        ]
                            
                    }],
                    
                attributes: [] 
            };
            
            let totalCounts;
            let data;
            filter.attributes=["booking_id","hotel_id","room_id","user_id","roomAvail"];
            

            
            if(booking_id)
            {
                filter.where["booking_id"]=booking_id;
            }
            if(hotel_id)
            {
                filter.where["hotel_id"]=hotel_id;
            }
            if(user_id)
            {
                filter.where["user_id"]=user_id;
            }
            
            filter.include[0].include[0].attributes=['id','firstName','lastName','email','phone']
            
           
            data = await BookingModel.findAll({where: filter.where, include: filter.include[0].include, attributes: filter.attributes});

            return this.success({ statusCode: 200, data });
        
        } catch (error) {
            
            throw (error);
        }
    }
}
module.exports = new AdminService();