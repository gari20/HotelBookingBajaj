const express=require("express");
const router=express.Router();
const HotelController=require('../controllers/hotel');

const { Auth } = require('../middleware');

router.post("/register",HotelController.hotelRegisterController);
router.post("/fill",Auth,HotelController.hotelInfoController);
router.post("/room_info",Auth,HotelController.roomInfoController);
router.get("/view_req",Auth,HotelController.fetchReqController);
router.patch("/update",Auth,HotelController.updateController);
router.post("/create_bill",Auth,HotelController.createBill);
router.get("/preview_bill",Auth,HotelController.previewBillController)

module.exports=router;