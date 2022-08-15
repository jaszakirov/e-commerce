const {
    Router
} = require('express')
const router = Router()
const Admins = require('../model/Admins')
router.get('/', async (req, res) => {
    const admins = await Admins.find()
    console.log(admins);
    res.render('admins', {
        title: 'Admins',
        admins
    })
})



module.exports = router