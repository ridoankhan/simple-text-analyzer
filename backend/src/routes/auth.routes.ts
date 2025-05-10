import express from 'express'
import passport from 'passport'

const router = express.Router()

const generateJwtToken = (user: any) => {
  const jwt = require('jsonwebtoken')
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
  return token
}

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
    prompt: 'consent',
  })
)

// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     res.redirect('/profile'); // Redirect to the frontend profile page
//   }
// );

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login?error=authentication_failed',
  }),
  (req: any, res: any) => {
    try {
      if (!req.user || !req.user.jwtToken) {
        console.error('Authentication failed: User or JWT token is missing')
        return res.redirect(
          'http://localhost:5173/login?error=authentication_failed'
        )
      }

      const jwtToken = req.user.jwtToken
      console.log('Redirecting with token:', jwtToken) // Debugging the token
      res.redirect(`http://localhost:5173/callback?token=${jwtToken}`)
    } catch (error) {
      console.error('Error during Google authentication:', error)
      res.redirect('http://localhost:5173/login?error=authentication_failed')
    }
  }
)

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/')
  })
})

router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true, user: req.user })
  } else {
    res.status(401).json({ authenticated: false })
  }
})

export default router
