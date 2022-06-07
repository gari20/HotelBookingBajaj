const express=require("express");
const router=express.Router();
const HotelController=require('../controllers/hotel');

const { Auth } = require('../middleware');


/**
 * @swagger
 * /hotel/register:
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
router.post("/register",HotelController.hotelRegisterController);


/**
 * @swagger
 * /hotel/fill:
 *  post:
 *     summary: Hotel Fill Information Service
 *     description: this API is used for filling info about hotels
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#components/schema/HotelFill'
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
 *        HotelFill:
 *          type: object
 *          properties:
 *              cityIdFk:
 *                  type: integer
 *              name:
 *                  type: string
 *              email:
 *                  type: string
 *              phone:
 *                  type: string
 *              address:
 *                  type: string
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
router.post("/fill",Auth,HotelController.hotelInfoController);


/**
 * @swagger
 * /hotel/room_info:
 *  post:
 *     summary: Room Fill Information Service
 *     description: this API is used for filling info about rooms
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#components/schema/RoomFill'
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
 *        RoomFill:
 *          type: object
 *          properties:
 *              roomType:
 *                  type: string
 *              roomPrice:
 *                  type: integer
 *              bedType:
 *                  type: string
 *              roomAval:
 *                  type: integer
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
router.post("/room_info",Auth,HotelController.roomInfoController);


/**
 * @swagger
 * /hotel/view_req:
 *  get:
 *      summary : Hotel View Requests service
 *      description : For fetching all requests
 *      responses:
 *          200:
 *               description:  Requests Fetched
 *               content:
 *                   application/json:
 *                      schema:
 *                           type: array
 *                           items:
 *                              $ref: '#components/schemas/HotelReq'
 *                      
 *      security:
  *         - BearerAuth: []
 *               
 */

 /**
  * @swagger
  * components:
  *  schemas:
  *      HotelReq:
  *           type: object
  *           properties:
  *              booking_id:
  *                 type: integer
  *              hotel_id:
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
router.get("/view_req",Auth,HotelController.fetchReqController);

/**
 * @swagger
 * /hotel/update:
 *  put:
 *      summary: To update the hotel Info
 *      description: this api is used to update hotel info
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#components/schemas/HotelUpdation'
 *          responses:
 *          200:
 *             description: Updated Sucessfully
 *      security:
*         - BearerAuth: []
 *     
 */

/**
  * @swagger
  * components:
  *  schemas:
  *      HotelUpdation:
  *           type: object
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
router.put("/update",Auth,HotelController.updateController);

/**
 * @swagger
 * /hotel/create_bill:
 *  post:
 *     summary: Hotel Bill Create Service
 *     description: this API is used for creating bills
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#components/schema/BillCreate'
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
 *        BillCreate:
 *          type: object
 *          properties:
 *              roomId:
 *                  type: integer
 *              userId:
 *                  type: integer
 *              billNumber:
 *                  type: integer
 *              roomPrice:
 *                  type: integer
 *              roomNo:
 *                  type: integer
 *              payingMethod:
 *                  type: string
 *              status:
 *                  type: string
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
router.post("/create_bill",Auth,HotelController.createBill);

/**
 * @swagger
 * /hotel/preview_bill:
 *  get:
 *      summary : Hotel preview bill  service
 *      description : For fetching all bills
 *      responses:
 *          200:
 *               description:  Bills Fetched
 *               content:
 *                   application/json:
 *                      schema:
 *                           type: array
 *                           items:
 *                              $ref: '#components/schemas/HotelBill'
 *                      
 *      security:
  *         - BearerAuth: []
 *               
 */

 /**
  * @swagger
  * components:
  *  schemas:
  *      HotelBill:
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
router.get("/preview_bill",Auth,HotelController.previewBillController);


/**
 * @swagger
 * /hotel/change_status/{id}:
 *  put:
 *      summary: To update the status of the user's bill
 *      description: this api is used to update user's bill status whether paid or pending
 *      parameters:
 *            - in : path
 *              name: id
 *              required: true
 *              description: bill Id is required
 *              schema:
 *                 type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#components/schemas/BillUpdation'
 *      responses:
 *            200:
 *               description: updated
 *               content:
 *                   application/json:
 *                      schema:
 *                           type: array
 *            404:
 *               description: bill not found
 *               content:
 *                   application/json:
 *                      schema:
 *                           type: array 
 *            
 * 
 *          
 *      security:
*         - BearerAuth: []
 *     
 */

/**
  * @swagger
  * components:
  *  schemas:
  *      BillUpdation:
  *           type: object
  *           properties:
  *                 status:
  *                     type: string
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
router.put("/change_status/:id",Auth,HotelController.changeStatusController);


/**
 * @swagger
 * /hotel/delete_room/{id}:
 *  delete:
 *      summary: To delete the room
 *      description: this api is used to delete room
 *      parameters:
 *            - in : path
 *              name: id
 *              required: true
 *              description: room Id is required
 *              schema:
 *                 type: integer
 *      
 *      responses:
 *            200:
 *               description: deleted
 *               content:
 *                   application/json:
 *                      schema:
 *                           type: array
 *            404:
 *               description: room not found
 *               content:
 *                   application/json:
 *                      schema:
 *                           type: array 
 *            
 * 
 *          
 *      security:
*         - BearerAuth: []
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

router.delete("/delete_room/:id",Auth,HotelController.deleteRoomController);


/**
 * @swagger
 * /hotel/delete_bill/{id}:
 *  delete:
 *      summary: To delete the bill
 *      description: this api is used to delete bills
 *      parameters:
 *            - in : path
 *              name: id
 *              required: true
 *              description: bill Id is required
 *              schema:
 *                 type: integer
 *      
 *      responses:
 *            200:
 *               description: deleted
 *               content:
 *                   application/json:
 *                      schema:
 *                           type: array
 *            404:
 *               description: bill not found
 *               content:
 *                   application/json:
 *                      schema:
 *                           type: array 
 *            
 * 
 *          
 *      security:
*         - BearerAuth: []
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
router.delete("/delete_bill/:id",Auth,HotelController.deleteBillController);



/**
 * @swagger
 * /hotel/delete_bookingr/{id}:
 *  delete:
 *      summary: To delete the booking of the user
 *      description: this api is used to delete user's booking
 *      parameters:
 *            - in : path
 *              name: id
 *              required: true
 *              description: booking Id is required
 *              schema:
 *                 type: integer
 *      
 *      responses:
 *            200:
 *               description: deleted
 *               content:
 *                   application/json:
 *                      schema:
 *                           type: array
 *            404:
 *               description: booking not found
 *               content:
 *                   application/json:
 *                      schema:
 *                           type: array 
 *            
 * 
 *          
 *      security:
*         - BearerAuth: []
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
router.delete("/delete_booking/:id",Auth,HotelController.deleteBookingController);



module.exports=router;