const router=require('express').Router()
 const ashu=require('../model/ashu')
 const Banner=require('../model/banner')
 const Query=require('../model/query')
 const Testi=require('../model/test')

router.get('/',async(req,res)=>{
const record= await Banner.findOne()
//console.log(record)

    res.render('index.ejs',{record})
})
router.get('/banner',async(req,res)=>{
    const bannerRecord= await Banner.findOne()
    console.log(bannerRecord)
    res.render('banner.ejs',{bannerRecord})
})
router.post('/queryrecord',(req,res)=>{
    let postedDate= new Date()
    const{email,query}=req.body
    const queryrecord=new Query({email:email,query:query,status:'unread',postedDate:postedDate})
    queryrecord.save()
    res.redirect('/')
})
router.get('/testi',(req,res)=>{
    res.render('testi.ejs')
})
router.post('/testirecord',async(req,res)=>{
    const{quote,cname}=req.body
    const testirecord=new Testi({quote:quote,cname:cname,status:'unpublish'})
    await testirecord.save()
  //  console.log(testirecord)
})






module.exports=router;