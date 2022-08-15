const {
    Router, response
} = require('express')
const router = Router()
const Admin = require('../model/Admins')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    res.render('register', {
        title: 'register',
        layout: 'auth'
    })
})
router.post('/auth/register', async (req, res) => {
    console.log(req.body.password);
    const hashPasword = await bcrypt.hash(req.body.password , 10)
    const admin = await new Admin({
        fullName : req.body.fullName ,
        email : req.body.email ,
        password: hashPasword,
        img : req.body.img || " "
    })
    admin.save()
    res.redirect('/auth/login')
})
router.get('/auth/login', (req, res) => {
    res.render('login', {
        title: "login",
        layout: "auth"
    })
})
router.post('/auth/login',async (req, res) => {
    const admin = await Admin.findOne({email : req.body.email})
    if(!admin){
       return res.status(404).send("This email  not found")
    }
    const compare =  await bcrypt.compare(req.body.password , admin.password)
    if(compare){
        res.redirect('/home')
    }else{
        res.status(404).send("Passwors is incorect")
        return
    }
    req.session.auth = true 
    req.session.admin = admin
    req.session.save((err)=>{ 
        if(err){
            throw new Error(err)
        }else{
            res.redirect('/home')
        }
    }) 
})

 



module.exports = router