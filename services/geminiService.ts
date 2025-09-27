
import { GoogleGenAI } from "@google/genai";
import type { PhotoEditingTool, GroundingChunk } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Function to find and parse the JSON array from the model's text response
const parseJsonResponse = (text: string): PhotoEditingTool[] => {
  const jsonRegex = /```json\s*([\s\S]*?)\s*```|(\[[\s\S]*\])/;
  const match = text.match(jsonRegex);
  
  if (!match) {
    console.error("No JSON block found in the response.");
    throw new Error("Could not find a valid JSON array in the model's response.");
  }

  // Use the first capturing group that is not undefined
  const jsonString = match[1] || match[2];

  if (!jsonString) {
    throw new Error("Could not extract JSON string from the response.");
  }
  
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    throw new Error("The model's response was not a valid JSON format.");
  }
};


export const fetchPhotoEditingTools = async (prompt: string): Promise<{ tools: PhotoEditingTool[], sources: GroundingChunk[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const tools = parseJsonResponse(response.text);
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || [];

    return { tools, sources };
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to fetch recommendations: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching recommendations.");
  }
};
