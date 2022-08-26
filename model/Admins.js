const {
    Schema,
    model
} = require('mongoose')
const adminsSchema = new Schema({
    fullName :{
        type : String , 
        required : true
    },
    email :{
        type : String ,
        required : true ,
        unique : true
    },
    password : {
        type : String , 
        required : true ,
        minLength : 6 ,
    } , 
    img : {
        type : String 
    } , 
    status : {
        type : String , 
        default : 'intern'
    }

})

module.exports = model('admin', adminsSchema)