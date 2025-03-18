import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;
app.use(express.json());

// Check for Firebase config file
const serviceAccountPath = path.join(__dirname, "key.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("Missing key.json file. Please add your Firebase service account key.");
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccountPath),
});

const db = getFirestore();

// Serve static files
app.use(express.static(path.join(__dirname)));

// Main route redirects to dashboard if logged in, otherwise shows homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

// Signup Route
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

// Login Route
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// Dashboard Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

// Signup API - Store user data in Firestore
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if user already exists
    const userSnapshot = await db.collection("user").where("email", "==", email).get();
    if (!userSnapshot.empty) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Create new user
    await db.collection("user").add({ name, email, password });
    res.json({ message: "Signup successful!", redirect: "/login" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Error signing up." });
  }
});

// Login API - Verify user credentials
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const snapshot = await db.collection("user").where("email", "==", email).get();
    if (snapshot.empty) {
      return res.status(400).json({ message: "User not found." });
    }

    let userFound = false;
    let userName = "";
    
    snapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.password === password) {
        userFound = true;
        userName = userData.name;
      }
    });

    if (userFound) {
      res.json({ 
        message: "Login successful!", 
        redirect: "/dashboard",
        name: userName
      });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});