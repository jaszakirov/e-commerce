const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
module.exports = (app , uri)=>{
    const store = new MongoDBStore({
        uri,
        collection: 'mySessions',
        expires: 1000 *60*60 
    });
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store

    }))

}
