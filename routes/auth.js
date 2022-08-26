const {
    Router, response
} = require('express')
const router = Router()
const Admin = require('../model/Admins')
const bcrypt = require('bcrypt')
const multer = require('multer')
const upload = require('../middleware/fileupload')
router.get('/register', async (req, res) => {
    res.render('register', {
        title: 'register',
        layout: 'auth'
    })
})
router.post('/register', upload.single('img')  ,  async (req, res) => {
    const hashPasword = await bcrypt.hash(req.body.password , 10)
    const admin = await new Admin({
        fullName : req.body.fullName ,
        email : req.body.email ,
        password: hashPasword,
        img : req.file.filename || " " ,
        status : req.body.status 
    })
    admin.save()
    res.redirect('/auth/login')
})
router.get('/login', (req, res) => {
    res.render('login', {
        title: "login",
        layout: "auth" , 
        msg : req.flash('error')
    })
})
router.post('/login',async (req, res) => {
    const admin = await Admin.findOne({email : req.body.email})
    if(!admin){
        req.flash('error' , 'Email is not found')
        res.redirect('/auth/login')
        return
    }
    const compare =  await bcrypt.compare(req.body.password , admin.password)
    if(!compare){
        req.flash('error' , 'Password is incorect')
        res.redirect('/auth/login')
        return
    }
    req.session.auth = true 
    req.session.admin = admin  
    req.session.save((err)=>{ 
        if(err){
            throw new Error(err)
        }else{
            res.redirect('/')
        }
    }) 
})
router.get('/logout' , async (req , res)=>{
    req.session.destroy((err)=>{
        if(err) throw new Error(err)
        res.redirect('/auth/login')
    })
   
})
module.exports = router