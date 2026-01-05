import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY is not set. Gemini API will not work.");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// System prompt for retail customer support
const SYSTEM_PROMPT = `You are a helpful and friendly AI customer support assistant for a retail business called RetailBot. Your role is to assist customers with their queries in a professional, empathetic, and efficient manner.

Key guidelines:
- Be concise but thorough in your responses
- Use a friendly, professional tone
- If a customer asks to speak with a human agent, respond with "ESCALATE" (exactly this word)
- Focus on retail-related topics: orders, returns, refunds, payments, delivery, store information, product availability
- If you don't know something, admit it and offer to connect them with a human agent
- Use emojis sparingly and appropriately
- Format responses with clear sections using markdown when helpful

Always be helpful and aim to resolve customer issues quickly.`;

/**
 * Get AI response from Gemini API
 * @param userMessage - The user's message
 * @param conversationHistory - Previous messages in the conversation
 * @returns The AI's response text
 */
export async function getGeminiResponse(
  userMessage: string,
  conversationHistory: Array<{ role: "user" | "bot"; content: string }>
): Promise<string> {
  if (!genAI) {
    throw new Error("Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
  }

  try {
    // Get the Gemini model
    // Try gemini-2.0-flash-exp first (latest experimental model)
    // If your API key doesn't support it, you'll get a 404 and can try other models
    // Common working models: gemini-2.0-flash-exp, gemini-2.5-flash, gemini-2.5-pro, gemini-pro
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Build conversation history for context
    const historyText = conversationHistory
      .slice(-10) // Keep last 10 messages for context
      .map((msg) => {
        const role = msg.role === "user" ? "User" : "Assistant";
        return `${role}: ${msg.content}`;
      })
      .join("\n\n");

    // Construct the full prompt
    const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation History:\n${historyText}\n\nUser: ${userMessage}\n\nAssistant:`;

    // Generate response
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // Check if user wants to escalate to human
    const lowerMessage = userMessage.toLowerCase();
    if (
      lowerMessage.includes("agent") ||
      lowerMessage.includes("human") ||
      lowerMessage.includes("real person") ||
      lowerMessage.includes("speak to someone") ||
      text.includes("ESCALATE")
    ) {
      return "ESCALATE";
    }

    return text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes("API_KEY")) {
        throw new Error("Invalid API key. Please check your VITE_GEMINI_API_KEY.");
      }
      if (error.message.includes("quota") || error.message.includes("rate limit")) {
        throw new Error("API quota exceeded. Please try again later.");
      }
      if (error.message.includes("404") || error.message.includes("not found")) {
        throw new Error("Model not found. Your API key might not have access to this model. Try enabling the Gemini API in Google Cloud Console or check available models.");
      }
    }
    
    throw new Error("Failed to get AI response. Please try again or contact support.");
  }
}

/**
 * Check if Gemini API is configured
 */
export function isGeminiConfigured(): boolean {
  return !!API_KEY && !!genAI;
}
