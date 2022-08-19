module.exports = (req , res , next )=>{
    res.render('error' , {
        layout : 'auth'
    })
}