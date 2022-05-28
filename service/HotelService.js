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
            //Logger.info('U registration service Started for %d', params.mobileNumber);
            console.log("Registration service for admin started");
            //const timeNow =this.getDateTime(new Date());
            params.userType = 'HOTEL';
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

    async roomInfoService(params){
        try{
            //console.log(params);
            //Logger.info('U registration service Started for %d', params.mobileNumber);
            console.log("Registration service for admin started");
            //const timeNow =this.getDateTime(new Date());
            

            // const isExist = await UserModel.findOne({ where: {"phone": params.phone } })
            // if(isExist){
            //     throw this.fail({ message: 'Hotel already exists', statusCode: 406 });
            // }
            
            // const salt= bcrypt.genSaltSync(10);
            // params.password =  bcrypt.hashSync(params.password, salt);

            const newUser = await RoomModel.create({ ...params});

            //Logger.info('Admin registration successfully completed for user %d', params.mobileNumber);
            console.log("completed");        
            return this.success({ statusCode: 201 });
        
        } catch (error) {
            //Logger.error(`Admin register service failed for user ${params.mobileNumber}. Error: ${error}`);
            throw (error);
        }
    }

    async hotelInfoService(params){
        try{
            //console.log(params);
            //Logger.info('U registration service Started for %d', params.mobileNumber);
            console.log("Registration service for admin started");
            //const timeNow =this.getDateTime(new Date());
            

            // const isExist = await UserModel.findOne({ where: {"phone": params.phone } })
            // if(isExist){
            //     throw this.fail({ message: 'Hotel already exists', statusCode: 406 });
            // }
            
            // const salt= bcrypt.genSaltSync(10);
            // params.password =  bcrypt.hashSync(params.password, salt);

            const newUser = await HotelModel.create({ ...params});

            //Logger.info('Admin registration successfully completed for user %d', params.mobileNumber);
            console.log("completed");        
            return this.success({ statusCode: 201 });
        
        } catch (error) {
            //Logger.error(`Admin register service failed for user ${params.mobileNumber}. Error: ${error}`);
            throw (error);
        }
    }

    async fetchReqService(params){
        try{
            const filter = { 
                where: { }, 
                include: [ 
                    { 
                        model: BookingModel,where:{},attributes:{}, 
                        include:[
                            {
                            model:UserModel,where:{},attributes:{}
                            },

                            {
                                model:RoomModel,where:{},attributes:{},
                                include:{
                                    model:HotelModel,attributes:{},where:{},
                                    include:{
                                        model:CityModel,attributes:{},
                                        include:{
                                            model:StateModel
                                        }
                                    }
                                }
                            }
                        ]
                            
                    }], 
                attributes: [] 
            };
            //console.log(filter.include[0].include[0]);
            console.log(filter.include[0].include[1].include);
            filter.include[0].include[1].include.where["id"]=params.userId;
            filter.attributes=['booking_id','roomAvail'];
            filter.include[0].include[0].attributes=['id','firstName','lastName','email','phone'];
            filter.include[0].include[1].attributes=['id','roomType','roomPrice','bedType','status'];
            filter.include[0].include[1].include.attributes=['id','name','phone','email','address'];
            filter.include[0].include[1].include.include.attributes=['id','name'];
            
            let data;
            let totalCounts;
            totalCounts= await BookingModel.count({where: filter.where});
            data = await BookingModel.findAll({where: filter.where, include: filter.include[0].include, attributes: filter.attributes});
            return this.success({ statusCode: 200, data,totalCounts });

        } catch(err) {
            throw(err);
        }
    }

    async updateService(params){
        try{
            
            
            //const timeNow =this.getDateTime(new Date());
            console.log(params.userId);
            const isHotel = await HotelModel.findByPk(params.userId);
            if(!isHotel)
                throw this.fail({ message: 'Hotel doesn\'t exist', statusCode: 404 });
            

             HotelModel.update({ ...params }, { where: { "id" : params.userId }});
            //Logger.info('update product service completed for user %d', params.userId);

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
            //console.log(params.user_id);

            const doExist=await UserModel.findOne({where:{"id":params.userId}});
            if(!doExist){
                throw this.fail({message:"User do not exist"});
            }
            const rmExist=await RoomModel.findOne({where:{"id":params.roomId}})
            if(!rmExist){
                throw this.fail({message:'Room do not exist',statusCode:406})
            }

            

              //console.log(totalAmount);

          
            
            const newUser = await BillModel.create({ ...params});

            //Logger.info('Admin registration successfully completed for user %d', params.mobileNumber);
            console.log("completed");        
            return this.success({ statusCode: 201 });
        


        }catch(err){
            throw(err);
        }
    }

    
    async previewBillService(params){
        try{
            const filter = { 
                where: { }, 
                group:{},
                attributes:[],
                // include: [ 
                //     { 
                //         model: BillModel,where:{},attributes:{},group:{},
                        include:[
                            {
                            model:UserModel,where:{},attributes:{},
                            },
                            {
                                model:RoomModel,where:{},attributes:{},
                                include:{
                                    model:HotelModel,where:{},attributes:{}
                                }

                            
                            }

                            
                        ]
                            
                    // }], 
                // attributes: [] 
            };
            //console.log(filter.include[0].include[0]);
            
            //console.log(filter.include[0].include[1].include);
            //filter.include[0].include[1].include.where["id"]=params.userId;
            //filter.include[0].include[1].include.where["id"]=params.userId;
            console.log(params.userId);
            filter.where["hotelId"]=params.userId;
            filter.group = ['userId'];
            filter.attributes=[Sequelize.fn('SUM', 
            (Sequelize.literal(`(${Sequelize.col('roomPrice').col} * ${Sequelize.col('roomNo').col})`))), 'productTotalPrice'
    ];
            //filter.include[0].include[0].attributes=['id','firstName','lastName','email','phone'];
            //filter.include[0].include[1].attributes=['id','roomType','roomPrice','bedType','status'];
            //filter.include[0].include[1].include.attributes=['id','name','phone','email','address'];
            //filter.include[0].include[1].include.include.attributes=['id','name'];
            
            let data;
            
            let totalCounts;
            totalCounts= await BillModel.count({where: filter.where});
            data = await BillModel.findAll({where: filter.where,include:filter.include, attributes: filter.attributes,group:filter.group});
            //console.log(data);
            // data.dataValues=data.map(item=>{
            //     item.dataValues.totalAmount=item.roomNo*item.roomPrice;
            //     return item;
            // });

            return this.success({ statusCode: 200, data,totalCounts });

        } catch(err) {
            throw(err);
        }
    }

    

}
module.exports = new HotelService();