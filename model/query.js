const mongoose=require('mongoose')

const querySchema=mongoose.Schema({
    email:String,
    query:String,
    status:String,
    postedDate:Date
})



module.exports=mongoose.model('query',querySchema)

