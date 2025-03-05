import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Use getGenerativeModel

export const generateText = async (prompt) => {
  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const response = result.response;

    if (!response || !response.candidates || response.candidates.length === 0) {
      console.error("Unexpected or empty API response:", response);
      throw new Error("Unexpected or empty API response from Gemini.");
    }

    const text = response.candidates[0].content.parts[0].text;
    return text.trim();

  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};