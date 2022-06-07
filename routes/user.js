const express=require("express");
const router=express.Router();
const UserController=require('../controllers/user');

const { Auth } = require('../middleware');

/**
 * @swagger
 * /user/register:
 *  post:
 *     summary: User Registration Service
 *     description: this API is used for registering user
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#components/schema/Register'
 *     responses:
 *          200:
 *             description: Registered Successfully
 */

/**
 * @swagger
 * components:
 *     schema:
 *        Register:
 *          type: object
 *          properties:
 *              firstName:
 *                  type: string
 *              lastName:
 *                  type: string
 *              email:
 *                  type: string
 *              phone:
 *                  type: string
 *              password:
 *                  type: string
 */
router.post("/register",UserController.userRegisterController);

/**
 * @swagger
 * /user/fetch_hotels:
 *  get:
 *      summary : User fetch hotels service
 *      description : For fetching all hotels
 *      responses:
 *          200:
 *               description:  Hotels Fetched
 *               content:
 *                   application/json:
 *                      schema:
 *                           type: array
 *                           items:
 *                              $ref: '#components/schemas/HotelFetch'
 *                      
 *      security:
  *         - BearerAuth: []
 *               
 */

 /**
  * @swagger
  * components:
  *  schemas:
  *      HotelFetch:
  *           type: object
  *           properties:
  *              hotel_id:
  *                 type: integer
  *              room_id:
  *                 type: integer
  *              
  */

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *          BearerAuth:
 *             type: http
 *             scheme: bearer
 *     
 * 

 *      
 */
router.get("/fetch_hotels",Auth,UserController.fetchHotelController);


/**
 * @swagger
 * /user/book_hotel:
 *  post:
 *     summary: Hotel Booking Service
 *     description: this API is used for booking  hotels
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#components/schema/HotelBook'
 *     responses:
 *          200:
 *             description: Registered Successfully
 * 
 *     security:
 *         - BearerAuth: []
 */

/**
 * @swagger
 * components:
 *     schema:
 *        HotelBook:
 *          type: object
 *          properties:
 *              hotel_id:
 *                  type: integer
 *              roomAvail:
 *                  type: integer
 *              room_id:
 *                  type: integer
 
 */

/**
 
 * @swagger
 *  components:
 *    securitySchemes:
 *          BearerAuth:
 *             type: http
 *             scheme: bearer
 *     
 * 

 *      
 
 */

router.post("/book_hotel",Auth,UserController.bookHotelController);

/**
 * @swagger
 * /user/get_bill:
 *  get:
 *      summary : User preview bill  service
 *      description : For fetching user's bill
 *      responses:
 *          200:
 *               description:  Bill Fetched
 *               content:
 *                   application/json:
 *                      schema:
 *                           type: array
 *                           items:
 *                              $ref: '#components/schemas/UserBill'
 *                      
 *      security:
  *         - BearerAuth: []
 *               
 */

 /**
  * @swagger
  * components:
  *  schemas:
  *      UserBill:
  *           type: object
  *           properties:
  *              booking_id:
  *                 type: integer
  *              user_id:
  *                 type: integer
  *              
  */

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *          BearerAuth:
 *             type: http
 *             scheme: bearer
 *     
 * 

 *      
 */
router.get("/get_bill",Auth,UserController.getBillController);
module.exports=router;