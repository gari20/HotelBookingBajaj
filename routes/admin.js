const express=require("express");
const router=express.Router();
const AdminController=require('../controllers/admin');
const { Auth } = require("../middleware");

router.post("/register",AdminController.adminRegisterController);
router.get("/fetch_booking",Auth,AdminController.adminFetchController);
module.exports=router;