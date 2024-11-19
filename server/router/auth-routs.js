const express = require('express');
const authController = require('../controllers/auth-controller');
const router = express.Router();
const { signupSchema, loginSchema } = require('../validators/auth-validator')
const validate = require('../middlewares/validation-middleware')
const authMiddleware = require('../middlewares/auth-middleware')

//? This is Root form Router
//! for this one we need make different route for "post method" and other method
// router.get("/",(req,res)=>{
//   res.status(200).send("This is Root form Router")
// })

//? This is second method for Root form Router
//! for this one we need can chain "post method" with other method


router.route("/").get(authController.home)


router.route("/register").post(validate(signupSchema), authController.register)
router.route("/login").post(validate(loginSchema), authController.login)
router.route("/user").get(authMiddleware, authController.user)
// router.route("/register").get(authController.register)



module.exports = router