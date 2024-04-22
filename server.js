const express = require('express')
const session = require('express-session')
const passport = require('passport')

const app = express();
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize())
app.use(passport.session())

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
  }
  
function isNotLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
    return res.redirect('/protected')
    }
    next()
}

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>')
  })
  
  app.get('/auth/google', isNotLoggedIn,
    passport.authenticate('google', { scope: ['email', 'profile'] })
  )


  app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
)