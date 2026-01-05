# Chatbot Not Working - Troubleshooting Guide

Since Supabase authentication is working, your `.env` file is being read correctly. The issue is likely with the Gemini API configuration.

## Quick Fix Steps

### Step 1: Verify Your .env File Has Gemini API Key

Open your `.env` file and make sure it contains BOTH Supabase AND Gemini keys:

```env
VITE_GEMINI_API_KEY=AIzaSyD8TMDlFcIffZp55OpIBQvw4TIVv2TgnU0
VITE_SUPABASE_URL=https://eujjfvtcdfghavmwhzuz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1ampmdnRjZGZnaGF2bXdoenV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1ODA1MTMsImV4cCI6MjA4MzE1NjUxM30.4iuASUW_2IwbPk2-1nGG4pG_sycXTrXcHqw_-vNdrmo
```

**Important:**
- All three lines must be present
- No spaces around `=`
- No quotes around values

### Step 2: Restart Your Development Server

**CRITICAL:** After updating `.env`, you MUST restart:

```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 3: Check Browser Console

1. Open your app in browser
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Look for these messages:
   - ✅ **Good:** No warnings about Gemini API
   - ❌ **Bad:** "VITE_GEMINI_API_KEY is not set" → API key missing
   - ❌ **Bad:** "Invalid API key" → API key is wrong
   - ❌ **Bad:** "API quota exceeded" → Hit rate limits

### Step 4: Test the Chatbot

1. Click the chat button
2. Send a message like "Hello"
3. Check what happens:
   - **Working:** You get an AI response
   - **Not working:** Error message or no response

## Common Issues & Solutions

### Issue 1: "Gemini API key is not configured"

**Solution:**
- Make sure `VITE_GEMINI_API_KEY` is in your `.env` file
- Restart the server after adding it
- Check the file is named exactly `.env` (not `.env.txt`)

### Issue 2: "Invalid API key"

**Solution:**
- Verify the API key is correct: `AIzaSyD8TMDlFcIffZp55OpIBQvw4TIVv2TgnU0`
- Check for extra spaces or characters
- Make sure the key is active in Google AI Studio

### Issue 3: "API quota exceeded"

**Solution:**
- You've hit the free tier limits
- Wait a bit and try again
- Check usage in Google Cloud Console

### Issue 4: Chatbot shows error message

**Solution:**
- Check browser console (F12) for detailed error
- The chatbot will show a user-friendly error message
- It should fall back to mock responses if Gemini fails

### Issue 5: Chatbot not responding at all

**Solution:**
- Check if the send button is disabled
- Look for JavaScript errors in console
- Make sure the chat modal is opening correctly

## Testing Checklist

- [ ] `.env` file has `VITE_GEMINI_API_KEY` line
- [ ] Server was restarted after updating `.env`
- [ ] Browser console shows no Gemini warnings
- [ ] Chatbot modal opens when clicking chat button
- [ ] Can type messages in the input field
- [ ] Send button is clickable
- [ ] Messages appear in chat window

## Debug Mode

To see what's happening, check the browser console:

1. Open browser console (F12)
2. Look for:
   - `"VITE_GEMINI_API_KEY is not set"` → Missing API key
   - `"Error calling Gemini API:"` → API call failed
   - `"Error getting AI response:"` → General error

## Fallback Behavior

The chatbot is designed to:
1. **First try:** Use Gemini API if configured
2. **Fallback:** Use mock responses if Gemini fails or isn't configured

So even if Gemini isn't working, the chatbot should still respond with mock responses.

## Still Not Working?

1. **Check package installation:**
   ```bash
   npm list @google/generative-ai
   ```
   If not installed:
   ```bash
   npm install @google/generative-ai
   ```

2. **Verify API key is valid:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Check if your API key is active
   - Try generating a new key if needed

3. **Check network:**
   - Make sure you have internet connection
   - Gemini API requires internet access

4. **Clear browser cache:**
   - Sometimes cached code can cause issues
   - Try hard refresh: `Ctrl + Shift + R`

## Expected Behavior

**When Gemini is working:**
- Responses are intelligent and contextual
- Can handle follow-up questions
- Understands conversation context

**When using fallback (mock responses):**
- Responses are generic but functional
- Based on keyword matching
- Still helpful for basic queries
