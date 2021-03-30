import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import { errorHandler } from '../utils/errorHandler.js'

export const getUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users)
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user || !(user.checkPassword(password))){
            return res.status(401).json({ errors: [{ msg: 'Wrong credentials' }] })
        }
        const token = generateToken(user._id)
        res.json({ token: `Bearer ${token}` })
    }
    catch (e) {
      errorHandler(res, e)
    }
}

export const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const { name, email, password } = req.body

        const existUser = await User.findOne({ email })

        if(existUser){
            return res.status(400).json({ errors: [{ msg: 'Пользователь с таким email уже существует' }] })
        }

        const salt = await bcrypt.genSaltSync(10)
        const passwordHash = await bcrypt.hashSync(password, salt)
        const user = new User({
            name,
            email,
            password: passwordHash,
            avatar: req.file ? req.file.path : ''
        })
        await user.save()
        const token = generateToken(user._id)
        res.status(201).json({ token: `Bearer ${token}`})
    }

    catch (e) {
        errorHandler(res, e)
    }
}

export const getUserByToken = async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user){
            return res.status(404).json({ errors: [{ msg: 'User not found'}] })
        }
        res.json(user)
    }
    catch (e) {
        errorHandler(res, e)
    }
}