import passport from 'passport'
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import Token from '../models/token.model'
import dotenv from 'dotenv'
dotenv.config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => {
      try {
        let user = await User.findOne({ where: { googleId: profile.id } })

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0].value,
            photo: profile.photos?.[0].value,
          })
        }

        // Generate a JWT token
        const jwtToken = generateJwtToken(user)

        // Attach the JWT token to the user object
        user.jwtToken = jwtToken

        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
    }
  )
)

const generateJwtToken = (user: User) => {
  // const jwtSecret = process.env.JWT_SECRET
  return jwt.sign({ id: user.id }, 'myjwtsecret', {
    expiresIn: '1h',
  })
}

passport.serializeUser((user: any, done) => {
  console.log('User being serialized:', user) // Debugging the user object
  done(null, { id: user.dataValues.id, jwtToken: user.jwtToken })
})

passport.deserializeUser(async (obj: any, done) => {
  try {
    const user = await User.findByPk(obj.id)
    if (!user) return done(new Error('User not found'))

    // Re-attach the token
    user.jwtToken = obj.jwtToken

    console.log('User being deserialized:', user) // Debugging the user object
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})
