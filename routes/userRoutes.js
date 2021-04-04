import express from 'express'
import { check } from 'express-validator'
import passport from 'passport'
import {getUsers, login, register, getUserByToken} from '../controllers/userController.js'
const router = express.Router()


router.route('/').get(passport.authenticate('jwt', { session: false }), getUsers)
router.route('/login').post(login)
router.route('/user').get(passport.authenticate('jwt', { session: false }), getUserByToken)
router.route('/').post([
    check('password', 'Enter password with 6 and more characters').isLength({min: 6}),
    check('email', 'Email must be email!').isEmail()
], register)


export default router