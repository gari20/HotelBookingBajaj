const express=require("express");
const router=express.Router();
const UserController=require('../controllers/user');
const User = require("../models/user");
const userValidators=require("../validators/user");
router.post('/login',  UserController.loginController);
module.exports=router;