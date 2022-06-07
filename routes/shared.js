const express=require("express");
const router=express.Router();
const UserController=require('../controllers/user');

/**
 * @swagger
 * /login:
 *  post:
 *      summary : Login Service
 *      description : For logging in all users
 *      requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#components/schemas/Login'
 *                  
 *      
 *      responses:
 *          200:
 *              description:  Logged in successfully
 *              content:
 *                   application/json:
 *                      schema:
 *                           type: array
 *                           items:
 *                              $ref: '#components/schemas/Login'
 *   
 */

/**
  * @swagger
  * components:
  *  schemas:
  *      Login:
  *           type: object
  *           properties:
  *              phone:
  *                 type: string
  *              password:
  *                 type: string
  *              
  */



router.post('/login',  UserController.loginController);
module.exports=router;