import jwt from 'jsonwebtoken'
import config from '../utils/config.js'

const generateToken = (id) => {
    return jwt.sign({id}, config.SECRET)
}

export { generateToken }