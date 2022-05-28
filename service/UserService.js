const jwt = require('jsonwebtoken');

const { jwtOption } = require('../config/db.config');
const bcrypt=require('bcrypt');
const Service=require('../service/Service');
const {UserModel,HotelModel,CityModel,StateModel, BookingModel, RoomModel}=require('../models');

class UserService extends Service {

    async userRegisterService(params){
        try{
            console.log(params);
            //Logger.info('U registration service Started for %d', params.mobileNumber);
            console.log("Registration service for admin started");
            //const timeNow =this.getDateTime(new Date());
            params.userType = 'USER';
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
    async fetchHotelService(params){
        try{
            const {cityId,stateId,address} = params;
            //console.log(params.cityIdFK);
            const filter = { 
                where: { }, 
                include: [ 
                    { 
                        model: RoomModel,where:{},group:{},
                        include: 
                            [
                                { 

                                model: HotelModel,where:{},group:{},
                                include:{
                                    model:CityModel,where:{},include:{
                                        model:StateModel,where:{}
                                    }
                                }
                                // include:[
                                //     {
                                //         model:CityModel,where:{},attributes:{ },
                                //         // include:[
                                //         //     {
                                //         //         model:StateModel,where:{}
                                //         //     }
                                //         // ]
                                        
                                //     }
                                // ]
                            }
                        ]
                        
                    }], 
                attributes: [] 
            };


            
            let totalCounts;
            let data;
            
            filter.attributes = ['id', 'roomType','roomPrice','bedType']
            // console.log(filter.include[0]);
            // console.log(address);
            // if(address)
            // {
            //     filter.include[0].where["address"]=address;
            // }
            filter.include[0].include[0].group=["id"];
            if(cityId)
            {
                filter.include[0].include[0].include.where["id"]=cityId;
                //console.log("hi");
            }
            if(stateId)
            {
                filter.include[0].include[0].include.include.where["id"]=stateId;
            }
                  
            
            //totalCounts = await HotelModel.count({where: filter.include[0].include.where});
            //console.log(filter.include[0].include[0].include[0].include);
            data = await RoomModel.findAll({where: filter.where, include: filter.include[0].include, attributes: filter.attributes});

            return this.success({ statusCode: 200, data, totalCounts });
        
        } catch (error) {
            //Logger.error(`fetch seller service failed. Error: ${error}`);
             this.fail({'message':'error found '});
            throw (error);
        }
    }
    async bookHotelService(params){
        try{
            
            //Logger.info('U registration service Started for %d', params.mobileNumber);
            console.log("Registration service for admin started");
            //const timeNow =this.getDateTime(new Date());
            
            const isExist = await HotelModel.findOne({ where: {"id":params.hotel_id } })
            if(!isExist){
                throw this.fail({ message: 'Hotel does not exist', statusCode: 406 });
            }
            console.log(params.user_id);

            const doExist=await UserModel.findOne({where:{"id":params.user_id}});
            if(!doExist){
                throw this.fail({message:"User do not exist"});
            }
      
             const roomExist=await RoomModel.findOne({where:{"id":params.room_id}});
            //console.log(doExist);
            //console.log(roomExist.dataValues);
            console.log(roomExist.status);
            if(roomExist.status!="Active"){
                throw this.fail({message:"Room not available"});
            }

            await RoomModel.update({status:"BOOKED" },{ where: { id: params.room_id}});
 
            roomExist.dataValues.status="BOOKED";
            //console.log(roomExist.dataValues);
            //roomExist.status="BOOKED";
            //console.log(doExist);

            

            

            //console.log(params);
            
            const newUser = await BookingModel.create({...params});

            //Logger.info('Admin registration successfully completed for user %d', params.mobileNumber);
            console.log("completed");        
            return this.success({ statusCode: 201 });
        
        } catch (error) {
            //Logger.error(`Admin register service failed for user ${params.mobileNumber}. Error: ${error}`);
            throw (error);
        }
    }

    async loginService(params) {
        try {
            //Logger.info('Login Service Started for User having id - %d', params.mobileNumber);
            let user = await UserModel.findOne({ where: { phone: params.phone } });

            const includeModel = {};

            if (!user) {
                throw this.fail({ message: 'User doesn\'t exists', statusCode: 404 });
            }

            console.log(user.password);
            // const salt= bcrypt.genSaltSync(10);
            // params.password =  bcrypt.hashSync(params.password, salt);
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

            //Logger.info('Login service completed for User having id - %d', params.mobileNumber);
            return this.success({ statusCode: 200, token: jwtToken, data: user });
        } catch (error) {
            //Logger.error('Login Service Failed for User having mobileNumber - %s with error -> %s', params.mobileNumber, JSON.stringify(error));
            throw (error);
        }
    }
}
module.exports = new UserService();