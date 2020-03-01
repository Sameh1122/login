const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const login = new mongoose.Schema({
  username:{type:String,required: true,unique:true},
  password:{type:String,required: true}
})

login.statics.findByCredentials= async(username,password)=>{
const user = await User.findOne({username})

if (!user){
  throw new Error ('Unable to login')
}
const isMatch = await bcrypt.compare(password, user.password)

if (!isMatch){
  throw new Error ('Unable to login')
}
return user
}

//Hash
login.pre('save',async function(next){
  const user = this;
  if( user.isModified('password')){
  user.password= await bcrypt.hash(user.password,8)
}
  next()
})

const User = mongoose.model('Login', login);
module.exports = User

