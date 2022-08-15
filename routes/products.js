const {
    Router
} = require('express')
const router = Router()
const Products = require("../model/Products")
const Categoriy = require('../model/category')

router.get('/', async (req, res) => {
    const products = await Products.find()
    res.render('products', {
        title: 'Products',
        products
    })
})

router.get('/add', async (req, res) => {
    const categories = await Categoriy.find()
    res.render('Addproduct', {
        tittle: "Addcategoriy",
        categories
    })
})
router.post('/add', async (req, res) => {
    const {
        categoryName,
        productName,
        productImg,
        aboutProduct,
        price,
        categoriyId
    } = req.body

    const product = new Products({
        categoryName,
        productName,
        productImg,
        aboutProduct,
        price,
        categoriyId

    })
    product.save()
    res.redirect('/products')

})
router.get('/edit/:id', async (req, res) => {
    const product = await Products.findById(req.params.id)
    const categories = await Categoriy.find()
    res.render('editProduct', {
        product ,
        categories
    })
})
router.post('/edit/:id' , async (req, res)=>{
    await Products.findByIdAndUpdate(req.params.id , req.body)
    res.redirect('/products')
})
router.get('/delete/:id' , async (req , res)=>{
    const product = await Products.findByIdAndDelete(req.params.id)
    res.redirect('/products')
})
module.exports = router