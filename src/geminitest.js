// npm install @google/generative-ai firebase
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");

// Firebase configuration object
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Google Generative AI API key
const API_KEY = "AIzaSyDD5M_mPhsO3yPHWsDqUSOiGOxyz7Mish4";

// Function to fetch image URL from Firebase
async function getImageUrl(imagePath) {
  const imageRef = ref(storage, imagePath);
  return await getDownloadURL(imageRef);
}

// Async function to generate a description of the image
async function describeImage(imagePath) {
  try {
    const imageUrl = await getImageUrl(imagePath);
    console.log("Image URL:", imageUrl);

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Describe the contents and appearance of the following image: ${imageUrl}`;
    const result = await model.generateContent(prompt);

    console.log("Image description:", result.response.text());
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function with the Firebase storage path
describeImage("images/magic_backpack.jpg"); // Adjust the path if needed
