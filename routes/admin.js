const express=require("express");
const router=express.Router();
const AdminController=require('../controllers/admin');
const { Auth } = require("../middleware");
const User = require("../models/user");
const userValidators=require("../validators/user");
router.post("/register",AdminController.adminRegisterController);
router.get("/fetch_booking",Auth,AdminController.adminFetchController);
module.exports=router;