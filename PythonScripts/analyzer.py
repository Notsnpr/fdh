import google.generativeai as genai
from PIL import Image
import os

def return_Resume_Results(file, t, k,):

    #Access the ai to generate a response
    result = model.generate_content(
    [file, "\n\n", t, k]
    )

    return result

# Configure with your API key directly (replace with your actual key)
genai.configure(api_key="AIzaSyDD5M_mPhsO3yPHWsDqUSOiGOxyz7Mish4")

resumeFile = "resumeExample.jpg"

myfile = genai.upload_file("resumeExample.jpg")

# Create the generative model
model = genai.GenerativeModel("gemini-1.5-flash")

# This should not change, it just gives the ai an innitial prompt
text = "Determine if this resume mathes these description: "


keywords = "software engineer, web developer, knows javascript"

response = return_Resume_Results(myfile, text, keywords,)

print(f"{response.text=}")