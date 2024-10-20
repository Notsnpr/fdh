//npm install @google/generative-ai

//import { useState } from 'react';
//const { useState } = require("react");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");

// To be used with a react call
//const [image, setImage] = useState('');
//const [keywords, setkeywords] = useState('');

//you can do the same format for GoogleGenerativeAI
//idk if you need filestate
//import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";



// This will be the api key
const API_KEY = "AIzaSyDD5M_mPhsO3yPHWsDqUSOiGOxyz7Mish4";

// Async function to handle the code using "await"
async function generateResponse() {
  try {
    //const [image, setImage] = useState('');
    //const [keywords, setkeywords] = useState('');
    // This will create the models to use 
    const fileManager = new GoogleAIFileManager(API_KEY);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // This will set the image to be usable by model
    const uploadResult = await fileManager.uploadFile(
        //`${mediaPath}/example2.png`,
        "src/testResume.jpg",
        {
          mimeType: "image/jpeg",
          displayName: "resume example",
        },
      );
      // View the response.
      console.log(
        `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
      );
    
    const prompt = "Create a simple response to see if this resume is contains these traits: ";
    keywords = "software engineer, web developer, knows javascript";

    const result = await model.generateContent([
        prompt, keywords,
        {
        // This is for the image file
          fileData: {
            fileUri: uploadResult.file.uri,
            mimeType: uploadResult.file.mimeType,
          },
        },
      ]);

    console.log(result.response.text());
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

// Call the async function
generateResponse();