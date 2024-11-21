require("dotenv").config(); 
const express = require('express');
const app = express();
const authRoute = require("./router/auth-routs")
const contactRoute = require("./router/contact-route")
const serviceRoute = require("./router/service-route")
const adminRoute = require("./router/admin-routs")
const connectdb = require('./utils/dbs');
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors")


const corsOptions = {
  origin: 'http://localhost:5174',
  method : "GET,POST,PUT,DELETE",
 
}
// cors enable 
app.use(cors(corsOptions))

app.use(express.json())



app.use("/api/auth", authRoute)
app.use("/api/form", contactRoute)
app.use("/api/data", serviceRoute)

//Admins routes

app.use("/api/admin", adminRoute)

app.use(errorMiddleware)




connectdb().then(() => {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`);
  })
})
