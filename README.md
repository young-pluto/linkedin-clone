# LinkedIn Clone - Professional Community Platform

A modern, responsive LinkedIn-like community platform built with HTML, CSS, and Vanilla JavaScript, powered by Firebase Realtime Database.

## 🚀 Live Demo

**https://linkedin-clone-mvjzvyicf-apoorvs-projects-50b645af.vercel.app**

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox and Grid
- **Vanilla JavaScript (ES6+)** - No frameworks, pure JavaScript
- **Font Awesome 6.0** - Professional icons
- **Google Fonts (Inter)** - Modern typography

### Backend & Services
- **Firebase Authentication** - User registration and login
- **Firebase Realtime Database** - Real-time data storage
- **Firebase Storage** - Image upload and storage
- **Firebase Hosting** - Static website hosting

## 📋 Features

### ✅ Required Features (All Implemented)

1. **User Authentication**
   - ✅ Register/Login functionality using Email & Password
   - ✅ User Profile including name, email, and bio
   - ✅ Secure authentication with Firebase Auth

2. **Public Post Feed**
   - ✅ Ability to create, read, and display text-only posts
   - ✅ Image upload capability for posts
   - ✅ Home feed that shows posts with author's name and timestamp
   - ✅ Real-time updates using Firebase Realtime Database
   - ✅ Character limit (500 characters) with live counter

3. **Profile Page**
   - ✅ Ability to view user's profile and their associated posts
   - ✅ Display user information (name, email, bio, profile picture)
   - ✅ Show all posts by the specific user

### 🎨 Additional Features

- **Modern UI/UX**: Professional LinkedIn-inspired design
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Updates**: Posts appear instantly without page refresh
- **Loading States**: Smooth loading indicators for better UX
- **Toast Notifications**: User-friendly success/error messages
- **Character Counter**: Live character count for post creation
- **Empty States**: Helpful messages when no content is available
- **Security**: XSS protection and input sanitization

### 🔗 Social Features

- **Connections System**: View all users, send/accept connection requests
- **Network Management**: Three tabs - All Users, Connection Requests, My Connections
- **Real-time Connection Status**: See pending, connected, or available users
- **Professional Networking**: Build your professional network like LinkedIn

### 📱 Interactive Features

- **Like System**: Like/unlike posts with heart animation
- **Comment System**: Add comments with realistic UI
- **Share System**: Share posts and track share count

### 🎯 Content Generation

- **Random Post Generator**: Auto-generates realistic posts from different industries
- **Sample Users**: 8 realistic professional profiles
- **Category-based Content**: Tech, Fitness, Education, Travel posts
- **Realistic Engagement**: Random likes, comments, and shares

## 📦 Setup Instructions

### Prerequisites
- A modern web browser
- Firebase account (free tier available)
- Git (for version control)

### Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider
4. Set up Realtime Database:
   - Go to Realtime Database
   - Create database in test mode (for development)
   - Set security rules (see below)
5. Enable Storage:
   - Go to Storage
   - Click "Get Started"
   - Choose your location
   - Set storage rules (see below)

### Step 2: Configure Firebase

1. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click on the web app icon (</>) to add a web app
   - Copy the config object

2. Update `firebase-config.js`:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```

### Step 3: Set Up Security Rules

#### Realtime Database Rules
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

#### Storage Rules
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

### Step 4: Run the Application

1. Clone or download the project files
2. Open `index.html` in a web browser
3. Or serve the files using a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

## 👤 Demo User Logins

For testing purposes, you can create accounts using any email and password combination. The system will automatically create user profiles with the provided information.

**Sample Users (Auto-generated):**
- Priya Sharma (Software Engineer at Google)
- Rajesh Kumar (Product Manager at Microsoft)
- Anjali Patel (Data Scientist at Amazon)
- Vikram Singh (Senior Developer at Netflix)
- Meera Reddy (UX Designer at Apple)
- Arjun Malhotra (AI Research Engineer at Meta)
- Zara Ahmed (Robotics Engineer at Tesla)
- Krishna Iyer (Aerospace Engineer at SpaceX)

## 🚀 Deployment

### Option 1: GitHub Pages (Recommended)
1. Push your code to a GitHub repository
2. Go to your repository settings
3. Scroll to "Pages" section
4. Select "Deploy from a branch"
5. Choose "main" branch
6. Click "Save"

### Option 2: Netlify
1. Push your code to a GitHub repository
2. Go to [Netlify](https://netlify.com/)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Deploy automatically

### Option 3: Vercel
1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com/)
3. Import your GitHub repository
4. Deploy automatically

## 🔧 Environment Variables (Optional)

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

## 🧪 Testing Your Deployment

1. **Test Authentication:**
   - Try creating a new account
   - Test login/logout functionality
   - Verify profile picture upload

2. **Test Posts:**
   - Create a new post with and without images
   - Verify it appears in the feed
   - Test like, comment, and share functionality

3. **Test Connections:**
   - Navigate to Connections page
   - Send connection requests
   - Accept/reject requests
   - View your network

4. **Test Profile:**
   - Navigate to your profile
   - Verify your posts are displayed
   - Test profile picture display

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

### Image Upload Issues
- Verify Firebase Storage is enabled
- Check storage rules allow authenticated uploads
- Ensure image file size is reasonable

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your Firebase configuration
3. Ensure all files are properly uploaded
4. Check the hosting platform's logs

## 🎉 Success!

Once deployed, your LinkedIn Clone will be live and accessible to users worldwide! The platform provides a complete professional networking experience with all the essential features of a modern social media platform.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using modern web technologies** 
