import express from "express";
import { GoogleGenAI } from "@google/genai"; // New 2026 Unified SDK

const router = express.Router();

// Initialize the client with your key
// Note: The new client handles versioning automatically
const client = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // gemini-2.5-flash is the stable choice for 2026. 
    // If you have Gemini 3 access, you can use "gemini-3-flash-preview"
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: [{ role: "user", parts: [{ text: message }] }]
    });

    // The new SDK returns a structured response; .text() extracts the string
    const botReply = response.text;

    console.log("Gemini 2.5 Response Success ✔ ");
    res.json({ botReply });

  } catch (err) {
    console.error("--- 2026 API ERROR ---");
    console.error(err.message);

    // Specific check for the 'limit: 0' / 429 quota error
    if (err.message.includes("429") || err.message.includes("quota")) {
      return res.status(429).json({ 
        error: "Quota exceeded. Ensure billing is enabled in Google AI Studio to unlock free tier usage." 
      });
    }

    res.status(500).json({ error: "AI communication failed. Check backend logs." });
  }
});

export default router;