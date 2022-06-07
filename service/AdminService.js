const bcrypt=require('bcrypt');
const Service=require('../service/Service');
const UserModel=require('../models/user');
const { BookingModel, HotelModel, CityModel, StateModel, BillModel } = require('../models');
class AdminService extends Service {

    async adminRegisterService(params){
        try{
            
            console.log("Registration service for admin started");
            
            params.userType = 'ADMIN';
            

            const isExist = await UserModel.findOne({ where: {"phone": params.phone } })
            if(isExist){
                throw this.fail({ message: 'User already exists', statusCode: 406 });
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

    async deleteUserService(params){
        try{

            const {id}=params;

            const ifExist=await UserModel.findOne({where:{"id":id}});
            if(!ifExist){
                throw this.fail({message:"User doesn't Exist"});
            }

            const billExist=await BillModel.findOne({where:{"userId":id}});
            if(billExist){
                throw this.fail({message:"Booking exists with this user"});
            }
            
            const bookExist=await BookingModel.findOne({where:{"user_id":id}});
            if(bookExist){
                throw this.fail({message:"Booking exists with this user"});
            }

            const hotelExist=await HotelModel.findOne({where:{"userId":id}});
            if(hotelExist){
                throw this.fail({message:"Hotel exists with this user"});
            }
            
            
            
            
            await UserModel.destroy( { where: { "id" : id }});
            

            return this.success({ statusCode: 202 });

        }
        catch(err){
            throw(err);
        }
    }
}
module.exports = new AdminService();