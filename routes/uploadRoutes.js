import express from 'express'
import multer from 'multer'
import moment from 'moment'
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/' )
    },
    filename(req, file, cb){
        const date = moment().format('DDMMYYYY-hhmmss-SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}

const upload = multer({
    storage,
    fileFilter,
    limits
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`${req.file.path}`)
})

export default router

