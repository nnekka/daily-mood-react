import express from 'express'
import { check } from 'express-validator'
import passport from 'passport'
const router = express.Router()
import {getUsers, login, register, getUserByToken} from '../controllers/userController.js'
import upload from '../middleware/upload.js'


router.route('/').get(passport.authenticate('jwt', { session: false }), getUsers)
router.route('/login').post(login)
router.route('/user').get(passport.authenticate('jwt', { session: false }), getUserByToken)
router.route('/').post(upload.single('image'), [
    check('password', 'Enter password with 6 and more characters').isLength({min: 6})
], register)


export default router