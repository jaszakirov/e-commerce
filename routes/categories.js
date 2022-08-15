const { Router } = require('express')
const router = Router()
const Category = require('../model/category')
const Products = require('../model/Products')

router.get('/', async (req, res) => {
    const categories = await Category.find()
    res.render('categories', {
        title: 'Categories',
        categories
    })
})

router.get('/add', (req, res) => {
    res.render('categoryAdd', {
        title: 'Create new category'
    })
})
router.get('/:id' ,async (req,res)=>{
    const categoryId = req.params.id
    const products = await Products.find({categoriyId : categoryId }).populate('categoriyId')
    console.log(products);
    res.render('category' , {
        products  
    }) 
}) 
router.post('/add', async (req, res) => {
    const { categoryName, categoryImg } = req.body
    const category = new Category({
        categoryName,
        categoryImg
    })
    await category.save()
    res.redirect('/categories')
})
router.get('/edit/:id' , async(req ,res )=>{
    const categoriyId = req.params.id
    const category = await Category.findById(categoriyId)
    res.render('editCategoriy' , {
        category ,
        categoriyId
    })
})
router.get('/delete/:id' , async (req , res)=>{
    await Category.findByIdAndDelete(req.params.id)
    res.redirect('/categories')
})
router.post('/edit/:id' , async (req,res)=>{
    const categoriyId = req.params.id
    const category = await Category.findByIdAndUpdate(categoriyId ,  req.body)
    category.save()

res.redirect('/categories')
})

module.exports = router