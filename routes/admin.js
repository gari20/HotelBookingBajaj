const express=require("express");
const router=express.Router();
const AdminController=require('../controllers/admin');
const { Auth } = require("../middleware");
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');

/**
 * @swagger
 * /admin/register:
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


 router.post("/register",AdminController.adminRegisterController);

/**
 * @swagger
 * /admin/fetch_booking:
 *  get:
 *      summary : Admin fetch booking service
 *      description : For fetching all bookings
 *      responses:
 *          200:
 *               description:  Bookings Fetched
 *               content:
 *                   application/json:
 *                      schema:
 *                           type: array
 *                           items:
 *                              $ref: '#components/schemas/User'
 *                      
 *      security:
  *         - BearerAuth: []
 *               
 */

 /**
  * @swagger
  * components:
  *  schemas:
  *      User:
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
router.get("/fetch_booking",Auth,AdminController.adminFetchController);


/**
 * @swagger
 * /admin/delete_user/{id}:
 *  delete:
 *      summary: To update the status of the user's bill
 *      description: this api is used to update user's bill status whether paid or pending
 *      parameters:
 *            - in : path
 *              name: id
 *              required: true
 *              description: user Id is required
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
 *               description: user not found
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
router.delete("/delete_user/:id",Auth,AdminController.deleteUserController);
module.exports=router;