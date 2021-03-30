import passportJWT from 'passport-jwt'
import config from '../utils/config.js'
import User from '../models/User.js'

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET
}

export default passport => {
    passport.use(
        new JwtStrategy(options, async(payload, done) => {
            try {
                const user = await User.findById(payload.id).select('-password')

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}