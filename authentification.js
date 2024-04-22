if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  const passport = require('passport')
  const GoogleStrategy = require('passport-google-oauth2').Strategy
  
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRE