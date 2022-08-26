const {
    Router
} = require('express')
const router = Router()
const Admins = require('../model/Admins')
const deleteFile = require('../utils/utils')
router.get('/', async (req, res) => {
    const admins = await Admins.find()
    console.log(admins);
    res.render('admins', {
        title: 'Admins',
        admins
    })
})
router.get('/delete/:id' , async (req , res)=>{
    const id = req.params.id
    const admin = await Admins.findByIdAndDelete(id)
    if(admin){
        await deleteFile(admin.img)
    }
    res.redirect('/admins')

})

 
module.exports = router