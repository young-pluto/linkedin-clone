# Deployment Guide

This guide will help you deploy your LinkedIn Clone to various hosting platforms.

## 🚀 Quick Deployment Options

### Option 1: Netlify (Easiest)

1. **Prepare your project:**
   - Make sure all files are in a GitHub repository
   - Update `firebase-config.js` with your Firebase credentials

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository
   - Click "Deploy site"

3. **Your site will be live at:** `https://your-site-name.netlify.app`

### Option 2: Vercel

1. **Prepare your project:**
   - Push your code to GitHub
   - Update Firebase configuration

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Your site will be live at:** `https://your-project-name.vercel.app`

### Option 3: GitHub Pages

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click "Settings"
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Click "Save"

3. **Your site will be live at:** `https://yourusername.github.io/your-repo-name`

## 🔧 Firebase Setup (Required)

Before deploying, you need to set up Firebase:

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter project name (e.g., "linkedin-clone")
4. Follow the setup wizard

### Step 2: Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"
5. Click "Save"

### Step 3: Set up Realtime Database

1. In Firebase Console, go to "Realtime Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

### Step 4: Get Configuration

1. In Firebase Console, go to "Project settings" (gear icon)
2. Scroll to "Your apps" section
3. Click the web icon (</>)
4. Register your app with a nickname
5. Copy the config object

### Step 5: Update Configuration

Replace the placeholder values in `firebase-config.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};
```

## 📝 Environment Variables (Optional)

For better security, you can use environment variables:

### Netlify
1. Go to your site settings in Netlify
2. Navigate to "Environment variables"
3. Add your Firebase config as environment variables
4. Update `firebase-config.js` to use them:

```javascript
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    // ... etc
};
```

## 🔒 Security Rules (Production)

For production deployment, update your Firebase security rules:

### Realtime Database Rules
```json
{
  "rules": {
    "linkedinUsers": {
      ".read": "auth != null",
      "$uid": {
        ".write": "$uid === auth.uid"
      }
    },
    "posts": {
      ".read": true,
      ".write": "auth != null"
    },
    "connectionRequests": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "connections": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### Storage Rules
```json
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload and read post images
    match /post-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow authenticated users to upload and read profile pictures
    match /profile-pictures/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Keep existing resume folder rules
    match /resume/{allPaths=**} {
      allow read: if true;
    }
    
    // Block everything else
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

## 🧪 Testing Your Deployment

1. **Test Authentication:**
   - Try creating a new account
   - Test login/logout functionality

2. **Test Posts:**
   - Create a new post
   - Verify it appears in the feed
   - Check real-time updates

3. **Test Profile:**
   - Navigate to your profile
   - Verify your posts are displayed

## 🐛 Common Issues

### Firebase Connection Error
- Check your Firebase configuration
- Ensure your domain is added to authorized domains in Firebase Console

### CORS Issues
- Add your domain to Firebase authorized domains
- Go to Authentication > Settings > Authorized domains

### Database Permission Denied
- Check your Firebase security rules
- Ensure you're using the correct database URL

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your Firebase configuration
3. Ensure all files are properly uploaded
4. Check the hosting platform's logs

## 🎉 Success!

Once deployed, your LinkedIn Clone will be live and accessible to users worldwide! 