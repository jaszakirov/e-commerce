const express = require('express')
const app = express()
require('dotenv').config()
const uri =  process.env.MONGO_URI
require('./helper/db')(uri)
require('./helper/session')(app , uri)
require('./start/routes')(app)
app.set('port',require('./utils/normalize')(process.env.PORT || 5000))
try {
    app.listen(app.get('port'), () => {
        console.log('Server working on port'  , app.get('port'));
    })
} catch (error) {
    console.error(error);
}

