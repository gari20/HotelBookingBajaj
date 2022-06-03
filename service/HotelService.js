const bcrypt=require('bcrypt');
const Service=require('../service/Service');
const UserModel=require('../models/user');
const { Sequelize } = require('../Utils');
const { BookingModel, HotelModel, CityModel, StateModel,RoomModel } = require('../models');
const BillModel = require('../models/bill');
class HotelService extends Service {

    async hotelRegisterService(params){
        try{
            console.log(params);
            
            console.log("Registration service for hotel started");
            
            params.userType = 'HOTEL';
            console.log(params.phone);

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

    async roomInfoService(params){
        try{
            
           const newUser = await RoomModel.create({ ...params});

            
            console.log("completed");        
            return this.success({ statusCode: 201 });
        
        } catch (error) {
            
            throw (error);
        }
    }

    async hotelInfoService(params){
        try{
            
           
            

            
            const newUser = await HotelModel.create({ ...params});

            
            console.log("completed");        
            return this.success({ statusCode: 201 });
        
        } catch (error) {
            
            throw (error);
        }
    }

    async fetchReqService(params){
        try{
            
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
                
                
                let data;
                filter.attributes=["booking_id","hotel_id","room_id","user_id","roomAvail"];
                
    
                
                filter.where["hotel_id"]=params.userId;
    
                
                filter.include[0].include[0].attributes=['id','firstName','lastName','email','phone']
                
                
                
                data = await BookingModel.findAll({where: filter.where, include: filter.include[0].include, attributes: filter.attributes});
    
            
            return this.success({ statusCode: 200, data });

        } catch(err) {
            throw(err);
        }
    }

    async updateService(params){
        try{
            
            
            
            console.log(params.userId);
            const isHotel = await HotelModel.findByPk(params.userId);
            if(!isHotel)
                throw this.fail({ message: 'Hotel doesn\'t exist', statusCode: 404 });
            

             HotelModel.update({ ...params }, { where: { "id" : params.userId }});
            

            return this.success({ statusCode: 202 });
        } catch(err) {
            throw(err);
        }
    }

    async createBillService(params){
        try{
            
            const isExist = await HotelModel.findOne({ where: {"id":params.hotelId } })
            if(!isExist){
                throw this.fail({ message: 'Hotel does not exist', statusCode: 406 });
            }
            

            const doExist=await UserModel.findOne({where:{"id":params.userId}});
            if(!doExist){
                throw this.fail({message:"User do not exist"});
            }
            const rmExist=await RoomModel.findOne({where:{"id":params.roomId}})
            if(!rmExist){
                throw this.fail({message:'Room do not exist',statusCode:406})
            }

            

              

          
            
            const newUser = await BillModel.create({ ...params});

            
            console.log("completed");        
            return this.success({ statusCode: 201 });
        


        }catch(err){
            throw(err);
        }
    }

    
    async previewBillService(params){
        try{
            
            const filter = { 
                where: {
                    hotelId: params.userId
                 }, 
                group:['userId'],
                attributes:['userId','roomPrice','roomNo','hotelId','roomId'],
                include: [
                    {
                        model: UserModel,
                        attributes: ['firstName', 'lastName'],
                        include: [
                            {
                                model: RoomModel,
                                where: {
                                    hotelId: params.userId
                                },
                                attributes:['id','hotelId','roomType','bedType']
                            }
                        ]
                    }
                ]
            };
            
            
            let data;
            
            let totalCounts;
            totalCounts= await BillModel.count({where: filter.where});
            
            data = await BillModel.findAll({where: filter.where,include:filter.include, attributes: filter.attributes});
            data = data.reduce((prev, curr)=>{
                if(prev.findIndex(item => item.userId === curr.userId) === -1){
                    const totalAmount = curr.user.rooms.reduce((sum, room)=>{
                        return sum + room.bills.roomNo*room.bills.roomPrice;
                    }, 0);
                    curr.dataValues.totalAmount = totalAmount;
                    console.log(curr);
                    prev.push(curr);
                    return prev;
                }
                return prev;
            }, []);

            return this.success({ statusCode: 200, data });
           
        } catch(err) {
            throw(err);
        }
    }

    

}
module.exports = new HotelService();