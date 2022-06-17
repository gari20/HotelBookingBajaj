const express=require("express");
const bodyParser=require("body-parser");
//create express app
const app=express();
const path = require('path');
const cors = require('cors');
const { Sequelize } = require('./Utils');
const {HotelModel,CityModel,StateModel, UserModel, BookingModel, RoomModel}=require('./models');
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');

const options={
    definition:{
        openapi : '3.0.0',
        info : {
            title : 'Hotel Booking Project',
            version : '1.0.0'
        },
        servers:[
            {
                url : 'http://localhost:3000/'
            }
        ]
    },
    components: {
        securitySchemes: {
          jwt: {
            type: "http",
            scheme: "bearer",
            in: "header",
            bearerFormat: "JWT"
          },
        }
      },

      
      security: [{
        jwt: {}
      }],
    swagger: "2.0",
    
    apis:['./routes/*.js']
}
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//setup the server port
const port=process.env.PORT||3000;

//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




//importing
const sharedRoutes=require("./routes/shared");
const userRoutes=require("./routes/user");
const hotelRoutes=require("./routes/hotel");
const adminRoutes=require("./routes/admin");
const BillModel = require("./models/bill");



//define route
app.use("/",sharedRoutes)
app.use("/user",userRoutes);
app.use("/hotel",hotelRoutes);
app.use("/admin",adminRoutes);


//listen to the port
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});

 

//associations
HotelModel.belongsTo(CityModel, { foreignKey: "cityIdFk"});
HotelModel.belongsTo(UserModel,{foreignKey:"userId"});

BillModel.belongsTo(UserModel,{foreignKey:"userId"});
BillModel.belongsTo(HotelModel,{foreignKey:"hotelId"});
BillModel.belongsTo(RoomModel,{foreignKey:"roomId"});
UserModel.belongsToMany(RoomModel, {through: BillModel});

HotelModel.hasMany(RoomModel);
RoomModel.belongsTo(HotelModel,{foreignKey:"hotelId"});

CityModel.belongsTo(StateModel, { foreignKey: "stateIdFk"});
BookingModel.belongsTo(UserModel,{ foreignKey:"user_id"});
BookingModel.belongsTo(HotelModel,{foreignKey:"hotel_id"});
BookingModel.belongsTo(RoomModel,{foreignKey:"room_id"});



Sequelize
    .authenticate()
    .then(result => {
        console.log('Connected To Database');
        app.listen(process.env.PORT, 'localhost', (res, err) => {
            if (err) {
                onError(err);
            }
            console.log('Server Listening on port: ' + port);
                  //Sequelize.sync({force:true});
        });
    })
    .catch(err => {
        console.log(err);
    });

function onError(error) {
    
    switch (error.code) {
        case 'EACCES':
            console.log(process.env.PORT + ' requires elevated privileges')
            process.exit(1)
        case 'EADDRINUSE':
            console.log(process.env.PORT + ' is already in use')
            process.exit(1)
        default:
            throw error
    }
}
