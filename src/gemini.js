//npm install @google/generative-ai
//import { GoogleGenerativeAI } from "@google/generative-ai";
/*
API_KEY="AIzaSyDD5M_mPhsO3yPHWsDqUSOiGOxyz7Mish4"
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Make sure to include these imports:

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a story about a magic backpack.";

const result = await model.generateContent(prompt);
console.log(result.response.text());
*/

// npm install @google/generative-ai
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Ensure API_KEY is set correctly
const API_KEY = "AIzaSyDD5M_mPhsO3yPHWsDqUSOiGOxyz7Mish4";

// Async function to handle the code using 'await'
async function generateStory() {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Write a story about a magic backpack.";
    const result = await model.generateContent(prompt);

    console.log(result.response.text());
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

// Call the async function
generateStory();
