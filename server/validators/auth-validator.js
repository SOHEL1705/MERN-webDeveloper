const zod = require("zod");

const loginSchema = zod.object({
  email: zod.string({ required_error: "email is required" })
    .trim()
    .email({ message: "Please enter a valid email address." })
    ,
  password: zod
    .string({ required_error: "password is required" })
    .trim()
    .min(10, { message: "password must be at least 10 characters" })
    .max(50, { message: "password must be less than 50 characters" }),
})



const signupSchema =loginSchema.extend({
  username: zod
    .string({ required_error: "username is required" })
    .trim()
    .min(6, { message: "username must be at least 6 characters" })
    .max(50, { message: "username must be less than 50 characters" }),

 
  phone: zod.string({ required_error: "phone is required" })
    .trim()
    .min(10, { message: "phone Number must be at least 10 Numbers" })
    .max(20, { message: "phone Number must be less than 50 Numbers" }),

})
module.exports ={ signupSchema, loginSchema }