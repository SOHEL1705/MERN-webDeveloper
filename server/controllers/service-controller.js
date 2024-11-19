const service = require("../models/service-model")

const  serviceController = async (req,res)=>{
  try {

    const services_res = await service.find()
    // res.send(services_res)
    if(!services_res){
      res.status(400).send({ msg: "Services Not Found" })      
      return 
    }
    res.status(200).json({ services_res })

  } catch (error) {
    console.log(`Service Controller Error ${error}`);
    
  }
}


module.exports = serviceController