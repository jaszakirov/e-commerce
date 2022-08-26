const express = require('express')
const path = require('path')
const flash = require('connect-flash')

const {
    create
} = require('express-handlebars')
const hbs = create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: './views/layouts',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
})
const mongoose = require('mongoose')
const uri = 'mongodb+srv://Jasurbek:JtjJ0M0QyCuNefca@cluster0.za0nvbi.mongodb.net/e-coomerce'



// middlewares
const authMiddleware = require('../middleware/auth')
const isAuth = require('../middleware/isAuth')
const error = require('../middleware/error')
// routes
const homeRouter = require('../routes/home')
const categoriesRouter = require('../routes/categories')
const adminsRouter = require('../routes/admins')
const productsRouter = require('../routes/products')
const usersRouter = require('../routes/users')
const authRouter = require('../routes/auth')


module.exports = (app) => {
    app.engine('hbs', hbs.engine)
    app.set('view engine', 'hbs')
    app.use(express.json())
    app.use(express.static(path.join(__dirname , '..', 'public')))
    app.use(express.urlencoded({
        extended: true
    }))
   
    app.use(flash());
    app.use('/auth', authRouter)
    app.use(authMiddleware)
    app.use(isAuth)
    //routing
    app.use('/', homeRouter)
    app.use('/categories', categoriesRouter)
    app.use('/admins', adminsRouter)
    app.use('/products', productsRouter)
    app.use('/users', usersRouter)
    app.use(error)

}