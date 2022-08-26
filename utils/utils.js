const fs = require('fs')
const path = require('path')
const folder = path.join(__dirname, '..', 'public', 'images' )
module.exports = async (filename) => {
    await fs.unlink(folder +'/'+ filename , (err)=>{
        if(err) throw new Error(err)
    } )
}