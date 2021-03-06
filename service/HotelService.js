const bcrypt=require('bcrypt');
const Service=require('../service/Service');
const UserModel=require('../models/user');
const { Sequelize } = require('../Utils');
const { BookingModel, HotelModel, CityModel, StateModel,RoomModel } = require('../models');
const BillModel = require('../models/bill');
class HotelService extends Service {

    async hotelRegisterService(params){
        try{
            
            
            console.log("Registration service for hotel started");
            
            params.userType = 'HOTEL';
            

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

    async roomInfoService(params,req){
        try{
            

            const isHotel=await HotelModel.findOne({where:{"userId":req.userId}});
             console.log(isHotel.id);
             if(!isHotel){
                throw this.fail({message:'Hotel does not exists'});
             }
            params.hotelId=isHotel.id;

           const newUser = await RoomModel.create({ ...params});
            console.log(params);
            
            console.log("completed");        
            return this.success({ statusCode: 201 });
            
        
        } catch (error) {
            
            throw (error);
        }
    }

    async hotelInfoService(params){
        try{

            const city=await CityModel.findOne({where:{"id":params.cityIdFk}});
            console.log(city);
            if(!city){
                throw this.fail({message:"City Doesnt Exist", statusCode: 406});
            }
            
           
            

            
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
            
            
            
            
            const isHotel = await HotelModel.findByPk(params.userId);
            if(!isHotel)
                throw this.fail({ message: 'Hotel doesn\'t exist', statusCode: 404 });
            

             HotelModel.update({ ...params }, { where: { "id" : params.userId }});
            

            return this.success({ statusCode: 202 });
        } catch(err) {
            throw(err);
        }
    }

    async createBillService(params,req){
        try{

            
            const isExist = await HotelModel.findOne({ where: {"userId":req.userId } })
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

            params.hotelId=isExist.id;
            

              

          
            
            const newUser = await BillModel.create({ ...params});

            
            console.log("completed");        
            return this.success({ statusCode: 201 });
        


        }catch(err){
            throw(err);
        }
    }

    
    async previewBillService(params){
        try{
            const isHotel=await HotelModel.findOne({where:{"userId":params.userId}})
            const filter = { 
                where: {
                    hotelId: isHotel.id
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
                                    hotelId: isHotel.id
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


    async changeStatusService(params,body){
        try{

            const {id}=params;

            const ifExist=await BillModel.findOne({where:{"id":id}});
            if(!ifExist){
                throw this.fail({message:"Bill doesn't Exist"});
            }
            
            
            BillModel.update({ ...body }, { where: { "id" : id }});
            

            return this.success({ statusCode: 202 });

        }
        catch(err){
            throw(err);
        }
    }

    async deleteRoomService(params){
        try{

            const {id}=params;

            const ifExist=await RoomModel.findOne({where:{"id":id}});

            if(!ifExist){
                throw this.fail({message:"Room doesn't Exist"});
            }
            if(ifExist.hotelId!=params.userId){
                throw this.fail({message:"Not authorized to delete room of another hotel"})
            }
            
            const billExist=await BillModel.findOne({where:{"roomId":id}});
            if(billExist){
                throw this.fail({messgae:"Booking exists with this room"});
            }
            
            const bookExist=await BookingModel.findOne({where:{"room_id":id}});
            if(bookExist){
                throw this.fail({message:"Booking exists with this room"});
            }
            
            await RoomModel.destroy( { where: { "id" : id }});
            

            return this.success({ statusCode: 202 });

        }
        catch(err){
            throw(err);
        }
    }

    async deleteBillService(params){
        try{

            const {id}=params;

            const ifExist=await BillModel.findOne({where:{"id":id}});
            if(!ifExist){
                throw this.fail({message:"Bill doesn't Exist"});
            }
            
            
            
            await BillModel.destroy( { where: { "id" : id }});
            

            return this.success({ statusCode: 202 });

        }
        catch(err){
            throw(err);
        }
    }

    async deleteBookingService(params){
        try{

            const {id}=params;

            const ifExist=await BookingModel.findOne({where:{"booking_id":id}});
            if(!ifExist){
                throw this.fail({message:"Booking doesn't Exist"});
            }
            
            
            await BookingModel.destroy( { where: { "booking_id" : id }});
            

            return this.success({ statusCode: 202 });

        }
        catch(err){
            throw(err);
        }
    }

    

}
module.exports = new HotelService();