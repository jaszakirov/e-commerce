const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    categoryName : {
        type : String ,
        required : true
    } ,
    productName : {
        type : String , 
        required : true
    } ,
    productImg : {
        type : String ,
        required : true
    } ,
    price : Number , 
    aboutProduct : {
        type : String , 
        required : true
    } ,
    categoriyId : {
        type : Schema.Types.ObjectId  ,
        ref : "category"
    }
})  

 



module.exports = model('Product', ProductSchema)