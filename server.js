const express = require('express')
const session = require('express-session')
const passport = require('passport')

const app = express();
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize())
app.use(passport.session())

require('./passport-config');

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

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`<h1>Welcome to SSO Demo</h1>
    <p>Hello, ${req.user.displayName}</p>
    <form action="/logout" method="post">
      <button type="submit">Logout</button>
    </form>`);
  })

app.post('/logout', (req, res) => {
req.logout(req.user, err => {
    if(err) return next(err);
    req.session.destroy();
    res.redirect("/");
    });
})

app.get('/auth/google/failure', (req, res) => {
res.send('Failed to authenticate with Google..')
})

app.listen(5000, () => console.log('Listening on port 5000'));