const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },

});

userSchema.methods.matchPassword = async function (enteredPassword) {

  return bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.generateAuthToken = async function () {
  try {
    return jwt.sign({ userId: this._id.toString(), email: this.email, isAdmin: this.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  } catch (error) {
    console.error(error)
  }
};


userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) {
    next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    const hash_password = await bcrypt.hash(this.password, salt)

    this.password = hash_password

  } catch (error) {
    next(error)
  }
})

const User = mongoose.model("User", userSchema);
module.exports = User;