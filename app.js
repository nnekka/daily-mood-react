import express from 'express'
import colors from 'colors'
import cors from 'cors'
import passport from 'passport'
import morgan from 'morgan'
import userRoutes from './routes/userRoutes.js'
import { connectToMongo } from './utils/connect.js'
import getTokenFromRequest from './middleware/passport.js'


const app = express()

connectToMongo()

app.use(passport.initialize()) // passport
getTokenFromRequest(passport) // passport
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/api/users', userRoutes)



export default app