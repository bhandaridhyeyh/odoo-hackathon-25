import express from 'express';
import passport from 'passport';
import { register, login, oauthSuccess } from '../controllers/authController.js';

const router = express.Router();

// Email/password auth
router.post('/register', register);
router.post('/login', login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), oauthSuccess);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), oauthSuccess);

export default router;
