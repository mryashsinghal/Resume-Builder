const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
// Google Auth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    res.redirect(`/auth/success?name=${encodeURIComponent(req.user.displayName)}`);
  }
);

// GitHub Auth
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get('/auth/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    res.redirect(`/auth/success?name=${encodeURIComponent(req.user.displayName)}`);
  }
);
// Success page
app.get('/auth/success', (req, res) => {
  const name = req.query.name || 'Unknown';
  res.send(`
    <h2>Welcome, ${name}!</h2>
    <a href="/">Go Back</a>
  `);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
