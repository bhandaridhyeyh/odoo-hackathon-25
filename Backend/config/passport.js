// config/passport.js
import dotenv from 'dotenv';
dotenv.config(); // ✅ LOAD ENV FIRST

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';

// 🔐 Serialize/Deserialize
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

// 🟢 Google OAuth Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ email: profile.emails[0].value });
      if (existingUser) return done(null, existingUser);

      const newUser = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      });

      done(null, newUser);
    } catch (err) {
      done(err, null);
    }
  }
));

// 🟣 GitHub OAuth Strategy
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
      const existingUser = await User.findOne({ email });
      if (existingUser) return done(null, existingUser);

      const newUser = await User.create({
        name: profile.displayName || profile.username,
        email: email,
        avatar: profile.photos[0].value,
      });

      done(null, newUser);
    } catch (err) {
      done(err, null);
    }
  }
));
