# Trend-wear
# TrendWear - Clothing Brand Website

## Overview
TrendWear is a modern clothing brand website featuring a user authentication system with **signup and login** functionality. Users can create an account, log in if they are existing users, and access their personalized profile. The authentication system is backed by **Firebase Firestore** for secure data storage.

## Features
✅ **User Authentication** - Sign up and log in with Firebase authentication.  
✅ **Navigation Bar** - Includes links to **Home, Signup, and Login**.  
✅ **Signup & Login Flow** - New users can sign up, which redirects them to the login page. Upon login, they are taken to the home page.  
✅ **Personalized Dashboard** - Displays "Hi, {username}" along with a profile section.  
✅ **Firestore Integration** - Stores user data securely in Firebase Firestore.  
✅ **Logout Functionality** - Users can log out securely from their session.  

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication

## Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/padmanjani-gorrela/TRENDWEAR.git
   cd TRENDWEAR
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication (Email/Password)**.
   - Set up **Firestore Database**.
   - Download `key.json` (service account key) and place it in the `src/` folder.
4. **Run the project:**
   ```sh
   npm start
   ```
5. **Open in Browser:**
   - Visit `http://localhost:3002/` to access the website.

## File Structure
```
TRENDWEAR/
│── src/
│   ├── dashboard.html  # Main HTML file
│   ├── index.js   #backend connection
│   ├── login.html   #login page
│   ├── signup.html   #signup page 
│   ├── key.json # Firebase configuration
│── package.json    # Project dependencies
│── README.md       # Project documentation
```

## How It Works
1. **Signup Page:** New users can create an account.
2. **Login Page:** Existing users enter credentials to log in.
3. **Home Page:** Displays `Hi, {username}` along with profile details.
4. **Logout:** Clicking logout ends the session and redirects to login.

## Contributions
Feel free to fork this repository and submit a pull request if you want to contribute! 🚀

## License
This project is licensed under the MIT License.
