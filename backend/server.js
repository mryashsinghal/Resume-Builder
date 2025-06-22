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

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Update this to your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../resumeBuilder')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Routes
app.use('/api/auth', authRoutes);

// Get current user info
app.get('/api/auth/user', (req, res) => {
  console.log('Current user:', req.user); // Debug log
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// Logout route
app.post('/api/auth/logout', (req, res) => {
  req.logout(() => {
    res.json({ success: true });
  });
});

// Google Auth
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/error' }),
    (req, res) => {
      // Successful authentication
      res.redirect('/user.html');
    }
  );
  
  // GitHub Auth
  app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
  );
  
  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/error' }),
    (req, res) => {
      // Successful authentication
      res.redirect('/user.html');
    }
  );
  
  // Error page
  app.get('/auth/error', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authentication Error</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .error { color: red; }
          .btn { padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h2 class="error">Authentication Failed</h2>
        <p>There was an error during authentication. Please try again.</p>
        <a href="/Auth.html" class="btn">Back to Login</a>
      </body>
      </html>
    `);
  });
  
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  