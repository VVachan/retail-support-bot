# Gemini Model 404 Error - Fix Guide

## The Problem
You're getting a 404 error because the Gemini model name is not found or your API key doesn't have access to it.

## Solution 1: Check API Key Permissions

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Enabled APIs**
3. Make sure **Generative Language API** is enabled
4. If not enabled, click **+ ENABLE APIS AND SERVICES** and search for "Generative Language API"

## Solution 2: Try Different Model Names

The code is currently set to use `gemini-1.0-pro`. If that doesn't work, try these alternatives:

### Option A: Update to gemini-1.0-pro (Current)
Already set in the code. Refresh your browser and test.

### Option B: If gemini-1.0-pro doesn't work
Edit `src/lib/gemini.ts` and change line 43 to try:

```typescript
// Try one of these:
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
// OR
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
// OR  
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
```

## Solution 3: Check Available Models

You can check which models your API key has access to:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Check your API key status
3. Look at available models in the documentation: https://ai.google.dev/api/models

## Solution 4: Verify API Key

1. Make sure your API key is correct: `AIzaSyD8TMDlFcIffZp55OpIBQvw4TIVv2TgnU0`
2. Check if the key is active in Google AI Studio
3. Try generating a new API key if needed

## Current Status

✅ Code updated to use `gemini-1.0-pro`
✅ Better error messages added
✅ Fallback to mock responses if Gemini fails

## Next Steps

1. **Refresh your browser** (the code change should auto-reload)
2. **Test the chatbot** - send a message
3. **Check browser console** (F12) for any new errors
4. **If still 404**: Try enabling Generative Language API in Google Cloud Console

## Alternative: Use Mock Responses

If Gemini API continues to have issues, the chatbot will automatically fall back to mock responses, so it will still work (just with simpler responses).
