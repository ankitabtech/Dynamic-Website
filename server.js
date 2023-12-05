const express=require('express')
const app=express()
app.use(express.urlencoded({extended:false}))
const frontendRouter=require('./routers/frontend')
const mongoose=require('mongoose')
const session=require('express-session')
const adminRouter=require('./routers/admin')
mongoose.connect('mongodb://127.0.0.1:27017/project1')



app.use(session({
    secret:'anki',
    saveUninitialized:false,
    resave:false
}))
app.use('/admin',adminRouter)
app.use(frontendRouter)
app.use(express.static('public'))
app.set('view engine',('ejs'))





app.listen(8000,(req,res)=>{
    console.log('server is running on port 8000')
})