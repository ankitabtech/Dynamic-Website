const mongoose=require('mongoose')

const testSchema=mongoose.Schema({
    quote:String,
    cname:String,
    status:String
})




module.exports=mongoose.model('testi',testSchema)