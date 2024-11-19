const zod = require("zod");

const contactSchema = zod.object({
  username: zod
  .string({ required_error: "username is required" })
  .trim()
  .min(6, { message: "username must be at least 6 characters" })
  .max(50, { message: "username must be less than 50 characters" }),
  email: zod.string({ required_error: "email is required" })
    .trim()
    .email({ message: "invalid email" })
    .transform((val) => val.split("@")[1]),
    username: zod
    .string({ required_error: "message is required" })
    .trim()
    .min(6, { message: "message must be at least 6 characters" })
    .max(1000, { message: "message must be less than 50 characters" }),
 

})

