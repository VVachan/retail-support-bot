# Gemini API Setup Guide

This guide will help you integrate Google Gemini API into your RetailBot chatbot.

## Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey) or [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Create a new API key:
   - If using AI Studio: Click "Get API Key" → "Create API Key"
   - If using Cloud Console: Navigate to "APIs & Services" → "Credentials" → "Create Credentials" → "API Key"
4. Copy your API key (you'll need it in the next step)

## Step 2: Install Dependencies

Run the following command in your project root:

```bash
npm install @google/generative-ai
```

## Step 3: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Important Notes:**
- Replace `your_actual_api_key_here` with the API key you obtained in Step 1
- Never commit your `.env` file to version control (it's already in `.gitignore`)
- The `.env.example` file shows the format but doesn't contain real keys

## Step 4: Restart Development Server

After adding the environment variable, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## Step 5: Test the Integration

1. Open your application in the browser
2. Click the chat button to open the chatbot
3. Send a test message like "Hello" or "What are your store hours?"
4. You should receive an AI-generated response from Gemini

## Troubleshooting

### "Gemini API key is not configured" Error

- Make sure your `.env` file exists in the project root
- Verify the variable name is exactly `VITE_GEMINI_API_KEY` (case-sensitive)
- Ensure there are no spaces around the `=` sign
- Restart your development server after creating/modifying `.env`

### "Invalid API key" Error

- Double-check that you copied the entire API key correctly
- Make sure there are no extra spaces or characters
- Verify the API key is active in Google AI Studio/Cloud Console

### "API quota exceeded" Error

- You may have hit the free tier rate limits
- Check your usage in Google Cloud Console
- Consider upgrading your plan if needed

### Fallback to Mock Responses

If Gemini is not configured, the chatbot will automatically fall back to mock responses. This allows the app to work even without an API key, but responses will be limited.

## API Costs

- Google Gemini offers a free tier with generous limits
- Check [Google AI Pricing](https://ai.google.dev/pricing) for current rates
- Monitor your usage in Google Cloud Console

## Security Best Practices

1. **Never commit API keys to version control**
   - The `.env` file should be in `.gitignore`
   - Use `.env.example` for documentation

2. **Use environment variables for production**
   - Set environment variables in your hosting platform (Vercel, Netlify, etc.)
   - Don't hardcode API keys in your code

3. **Rotate keys if compromised**
   - If you suspect your key is exposed, regenerate it immediately
   - Update the key in all environments

## Next Steps

Once Gemini is working:
- Customize the system prompt in `src/lib/gemini.ts` to match your business needs
- Adjust conversation history length (currently set to last 10 messages)
- Add error handling for specific use cases
- Consider implementing rate limiting for production

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key is valid
3. Ensure you have internet connectivity
4. Review the Gemini API documentation: https://ai.google.dev/docs
