const router=require('express').Router()
const Ashu=require('../model/ashu')
const Banner=require('../model/banner')
const Query=require('../model/query')
const Testi=require('../model/test')
const nodemailer=require('nodemailer')
function handlelogin(req,res,next){
  if(req.session.isAuth){
    next()
  }else{
    res.redirect('/admin/')
  }
}

router.get('/',(req,res)=>{
    res.render('admin/adminlogin.ejs',{mess:''})
})
router.post('/loginrecord',async(req,res)=>{
    const{username,password}=req.body
   const d= await Ashu.findOne({username:username})
  console.log(d)
  if(d!==null){
    if(d.password==password){
        req.session.isAuth=true
        res.redirect('/admin/dashboard')
  }else{
    res.render('admin/adminlogin.ejs',{mess:'wrong credentails'})
  }
  } else{
    res.render('admin/adminlogin.ejs',{mess:'wrongcredentials'})
  }
})

router.get('/dashboard',handlelogin,(req,res)=>{
    res.render('admin/dashboard.ejs')
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/admin/')
})
router.get('/banner',async(req,res)=>{
  const bannerRecord=await Banner.findOne()
  res.render('admin/banner.ejs',{bannerRecord})
})
router.get('/bannerupdate/:abc',async(req,res)=>{
  const id=req.params.abc
  const bannerRecord=await Banner.findById(id)
  res.render('admin/bannerform.ejs',{bannerRecord})
})
router.post('/bannerRecord/:xyz',async(req,res)=>{
  const id=req.params.xyz
  const{bd,ld,lt}=req.body
  const bannerRecord=await Banner.findByIdAndUpdate(id,{title:bd,desc:ld,longdesc:lt})
  res.redirect('/admin/banner')
})
router.get('/query',async(req,res)=>{
  const queryrecord=await Query.find().sort({postedDate:-1})
  res.render('admin/query.ejs',{queryrecord})
})
router.get('/queryupdate/:abc',async(req,res)=>{
  const id=req.params.abc
  const queryrecords=await Query.findById(id)
  console.log(queryrecords)
  let newStatus=null
  if(queryrecords.status=='unread'){
    newStatus='read'
  }else{
    newStatus='unread'
  }
  await Query.findByIdAndUpdate(id,{status:newStatus})
  res.redirect('/admin/query')
})
router.get('/email',(req,res)=>{
res.render('admin/email.ejs')
})
router.post('/emailrecord',async(req,res)=>{
  const{emailto,emailbody,subject}=req.body
  const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'ankita2001tec@gmail.com',
    pass: 'bcrd mukf nwrp ajlj',
  },
});
const info = await transporter.sendMail({
  from: 'ankita2001tec@gmail.com', // sender address
  to: "ank763407@gmail.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
 // html: "<b>Hello world?</b>", // html body
});
})
router.get('/emailtest',async(req,res)=>{
  const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'ankita2001tec@gmail.com',
    pass: 'bcrd mukf nwrp ajlj',
  },
});
const info = await transporter.sendMail({
  from: 'ankita2001tec@gmail.com', // sender address
  to: emailto, // list of receivers
  subject: emailsubject, // Subject line
  text: body, // plain text body
  //html: "<b>Hello world?</b>", // html body
});
})
router.get('/testi',async(req,res)=>{
  const testiRecord=await Testi.find()
  res.render('admin/testi.ejs',{testiRecord})
})








router.get('/test',(req,res)=>{
    const x=new Banner({title:'banner title', desc:'banner desc', longdesc:'banner longdesc'})
    x.save()
})


module.exports=router;