const mongoose = require ('mongoose')
require('./roots')
mongoose.connect('mongodb://127.0.0.1:27017/loginSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndexes:true  
})
.then(()=>console.log('Connected to database'))
.catch((e)=>console.log(e))
