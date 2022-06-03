const jwt = require('jsonwebtoken');

const { jwtOption } = require('../config/db.config');
const bcrypt=require('bcrypt');
const Service=require('../service/Service');
const { Op } = require("sequelize");
const {UserModel,HotelModel,CityModel,StateModel, BookingModel, RoomModel,BillModel}=require('../models');

class UserService extends Service {

    async userRegisterService(params){
        try{
            console.log(params);
            
            console.log("Registration service for user started");
            
            params.userType = 'USER';
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
    async fetchHotelService(params){
        try{
            const {cityId,stateId,address, hotelId} = params;
            
            const filter = { 
                where: { }, 
                include: [ 
                    { 
                        model: RoomModel,
                    }], 
                attributes: [] 
            };


            
            let totalCounts;
            let data;
            
            filter.attributes = ['id', 'roomType','roomPrice','bedType']
           
            if(hotelId){
                filter.where = {
                    id: {
                        [Op.in]: hotelId.split(','),  
                    }
                }
            }
            if(cityId){
                filter.where={
                    cityIdFk:{
                        [Op.in]: cityId.split(','),
                    }
                }
            }

            
                  
            
            
            

            data = await HotelModel.findAll({where: filter.where, include: filter.include});
            return this.success({ statusCode: 200, data });
        } catch (error) {
            
             this.fail({'message':'error found '});
            throw (error);
        }
    }
    async bookHotelService(params){
        try{
            
            
            
            const isExist = await HotelModel.findOne({ where: {"id":params.hotel_id } })
            if(!isExist){
                throw this.fail({ message: 'Hotel does not exist', statusCode: 406 });
            }
            

            const doExist=await UserModel.findOne({where:{"id":params.user_id}});
            if(!doExist){
                throw this.fail({message:"User do not exist"});
            }
      
             const roomExist=await RoomModel.findOne({where:{"id":params.room_id}});
            
            
            if(roomExist.roomAval<params.roomAvail){
                throw this.fail({message:"Room not available"});
            }
             let c=roomExist.roomAval-params.roomAvail;
            await RoomModel.update({roomAval:c},{ where: { id: params.room_id}});
 
            
            
            const newUser = await BookingModel.create({...params});

            
            console.log("completed");        
            return this.success({ statusCode: 201 });
        
        } catch (error) {
           
            throw (error);
        }
    }

    async loginService(params) {
        try {
            
            let user = await UserModel.findOne({ where: { phone: params.phone } });

            const includeModel = {};

            if (!user) {
                throw this.fail({ message: 'User doesn\'t exists', statusCode: 404 });
            }

            console.log(user.password);
            
            console.log(params.password);
            if (!await bcrypt.compare(params.password, user.password)) {
                throw this.fail({ message: 'Invalid Password', statusCode: 401 });
            }
            

            user = await UserModel.findByPk(user.id, { ...includeModel, attributes: { exclude: ['password'] } });
            
            const jwtToken = jwt.sign({
                userIdPk: user.id,
                phone: params.phone,
                userType: user.userType
            }, jwtOption.secret, { expiresIn: jwtOption.expiresIn, algorithm: 'HS512' });

            
            return this.success({ statusCode: 200, token: jwtToken, data: user });
        } catch (error) {
            
            throw (error);
        }
    }

    async getBillService(params){
        try{
            const filter = { 
                where: {
                    userId: params.userId
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
                                    
                                   
                                },
                                attributes:['id','hotelId','roomType','bedType']
                            }
                        ]
                    }
                ]
            };
            console.log(params.userId);
            
            let data;
            
            let totalCounts;
            
            data = await BillModel.findAll({where: filter.where,include:filter.include, attributes: filter.attributes});
            data = data.reduce((prev, curr)=>{
                if(prev.findIndex(item => item.userId=== curr.userId) === -1){
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
           
        }catch(error){
            throw (error);
        }

    }
}
module.exports = new UserService();