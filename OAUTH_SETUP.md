# OAuth Authentication Setup Guide

This guide will help you set up Google and GitHub OAuth authentication for your Resume Builder application.

## Prerequisites

1. Node.js and npm installed
2. MongoDB running locally or a MongoDB Atlas account
3. Google Developer Console account
4. GitHub Developer account

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/resume-builder

# Session Secret
SESSION_SECRET=your-super-secret-session-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# JWT Secret (for regular auth)
JWT_SECRET=your-jwt-secret-key

# Server Configuration
PORT=5000
NODE_ENV=development
```

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback` (for development)
   - `https://yourdomain.com/auth/google/callback` (for production)
7. Copy the Client ID and Client Secret to your `.env` file

## GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: "Resume Builder"
   - Homepage URL: `http://localhost:5000` (for development)
   - Authorization callback URL: `http://localhost:5000/auth/github/callback`
4. Click "Register application"
5. Copy the Client ID and Client Secret to your `.env` file

## Installation

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:5000`

## Features Added

- ✅ Google OAuth authentication
- ✅ GitHub OAuth authentication
- ✅ Modern UI with styled OAuth buttons
- ✅ Session management
- ✅ User model with OAuth fields
- ✅ Success/Error pages
- ✅ Responsive design

## How It Works

1. Users click on "Continue with Google" or "Continue with GitHub"
2. They are redirected to the respective OAuth provider
3. After successful authentication, they are redirected back to your app
4. A new user account is created if it doesn't exist
5. Users are redirected to a success page and can then access the resume builder

## Security Notes

- Always use HTTPS in production
- Keep your client secrets secure
- Use strong session secrets
- Consider implementing CSRF protection
- Regularly rotate your secrets

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI"**: Make sure the callback URLs in your OAuth app settings match exactly
2. **"Client ID not found"**: Verify your environment variables are set correctly
3. **"MongoDB connection failed"**: Ensure MongoDB is running and the connection string is correct

### Debug Mode:

To enable debug logging, add this to your `.env` file:
```env
DEBUG=passport:*
```

## Next Steps

- Add user profile management
- Implement logout functionality
- Add email verification
- Set up password reset functionality
- Add role-based access control 