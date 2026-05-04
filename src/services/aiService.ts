import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const checkSymptoms = async (symptoms: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following symptoms and suggest possible conditions. Provide a disclaimer that this is not a medical diagnosis.
    Symptoms: ${symptoms}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          conditions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                urgency: { type: Type.STRING, enum: ["low", "medium", "high"] }
              },
              required: ["name", "description", "urgency"]
            }
          },
          disclaimer: { type: Type.STRING }
        },
        required: ["conditions", "disclaimer"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const scanMedicine = async (base64Image: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image
        }
      },
      {
        text: "Identify this medicine and provide its name, common usage, general dosage instructions, and primary side effects. If you cannot identify it, state so."
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          identified: { type: Type.BOOLEAN },
          name: { type: Type.STRING },
          usage: { type: Type.STRING },
          dosage: { type: Type.STRING },
          sideEffects: { type: Type.STRING }
        },
        required: ["identified"]
      }
    }
  });

  return JSON.parse(response.text);
};
