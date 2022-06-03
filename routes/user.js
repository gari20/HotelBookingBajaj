const express=require("express");
const router=express.Router();
const UserController=require('../controllers/user');

const { Auth } = require('../middleware');

router.post("/register",UserController.userRegisterController);
router.get("/fetch_hotels",Auth,UserController.fetchHotelController);
router.post("/book_hotel",Auth,UserController.bookHotelController);
router.get("/get_bill",Auth,UserController.getBillController);
module.exports=router;