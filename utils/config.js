import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3333
const MONGO_URI = process.env.MONGO_URI
const SECRET = process.env.SECRET


export default {
    PORT,
    MONGO_URI,
    SECRET
}