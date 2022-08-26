const moment = require('moment');
const multer = require('multer')
const path = require('path')
const folder = path.join(require.main.filename)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, folder + '/../public/images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = moment().format('dd-mm-yyyy_hh-ss') +  file.originalname
        cb(null, uniqueSuffix)
    } 
})
const allowTypes = ['image/png', 'image/jpg', 'image/jpeg'] 
const fileFilter = (req, file, cb) => {
    if (allowTypes.includes(file.mimetype)) {
        return cb(null, true)
    } else {
        return cb(null, false)
    }
}

module.exports = multer({
    storage,
    fileFilter,
})