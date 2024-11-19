const User = require('../models/user-model')
const bcrypt = require('bcryptjs')


// Home Controller ....................................................................................................
const home = async (req, res) => {
  try {
    res.status(200).send("This is Root form Router")
  } catch (error) {
    res.status(400).send({ msg: `page not fount ${error} ` })
  }
}

// Register Controller .................................................................................................
const register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body
    const existedUser = await User.findOne({ email: email })
    if (existedUser) {
      return res.status(400).send({ message: "User Already Exists" })
    }

    const userCreate = await User.create({ username, email, password, phone })
    console.log(req.body);
    res.status(201).send({ msg: "User Created Successfully", token: await userCreate.generateAuthToken(), userId: userCreate._id.toString() })



  } catch (error) {
    res.status(400).send({ msg: `page not fount ${error} ` })
  }
}


// Login Controller .....................................................................................................



const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    console.log(user);
    if (!user) {
      return res.status(400).send({ message: "User Not Found" })
    }
    // const isMatch = await bcrypt.compare(password, user.password)
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(400).send({ message: "invalid Password" })
    }
    if (isMatch) {
      res.status(200).send({
        msg: "Login Successfully",
        username: user.username,
        token: await user.generateAuthToken(),
        userId: user._id.toString()
      })
    } else {
      return res.status(400).send({ msg: "invalid Password" })
    }

    // res.status(200).send({ msg: "Login Successfully", username: user.username, token: await user.generateAuthToken(), userId: user._id.toString() })

  } catch (error) {
    console.error(error);

  }



  //? User Controller ..................................................................................................... 

  const user = async (req, res) => {
    try {
      const userData = req.user

      res.status(200).send({ msg: "User Found Successfully", userData })
    } catch (error) {
      res.status(400).send({ msg: `page not fount ${error} ` })
    }
  }

}


//? User Controller  ..................................................................................................... 
const user = async (req, res) => {
  try {
    const userData = req.user
    res.status(200).send({  userData })
  } catch (error) {
    res.status(400).send({ msg: `page not fount ${error} ` })
  }
}

module.exports = { home, register, login, user } 