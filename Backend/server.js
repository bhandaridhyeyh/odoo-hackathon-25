import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import itemRoutes from './routes/items.js';
import swapRoutes from './routes/swaps.js';
import adminRoutes from './routes/admin.js';
import connectDB from './config/db.js';
import './config/passport.js';

connectDB();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(session({ secret: 'rewear-secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
