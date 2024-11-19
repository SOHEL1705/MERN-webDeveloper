const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI 

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("connected to db");
    
  } catch (error) {
   console.error("Error while connecting to the database:", error.message);
    process.exit(0)
  }
  
}
module.exports = connectDB
