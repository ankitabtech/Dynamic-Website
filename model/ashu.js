const mongoose=require('mongoose')

 const mongooseSchema=mongoose.Schema({
    username:String,
    password:String,
   
})



module.exports=mongoose.model('ashu',mongooseSchema)