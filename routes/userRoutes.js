import express from 'express'
import { check } from 'express-validator'
import passport from 'passport'
import {getUsers, login, register, getUserByToken, updateUserProfile} from '../controllers/userController.js'
const router = express.Router()


router.route('/').get( getUsers)
router.route('/login').post(login)
router.route('/user').get(passport.authenticate('jwt', { session: false }), getUserByToken)
router.route('/').post([
    check('password', 'Enter password with 6 and more characters').isLength({min: 6}),
    check('email', 'Email must be email!').isEmail()
], register)
router.route('/:id').put(passport.authenticate('jwt', { session: false }), updateUserProfile)


export default router