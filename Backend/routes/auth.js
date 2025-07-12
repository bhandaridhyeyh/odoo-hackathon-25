import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Email/password auth
router.post('/register', register);
router.post('/login', login);

// Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.redirect(`http://localhost:8080/oauth-redirect?token=${token}`);
  }
);

// GitHub OAuth
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.redirect(`http://localhost:8080/oauth-redirect?token=${token}`);
  }
);

export default router;
