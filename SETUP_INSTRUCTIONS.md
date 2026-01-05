# Quick Setup Guide - Gemini API Integration

## ✅ What Has Been Added

1. **Gemini API Service** (`src/lib/gemini.ts`) - Handles all Gemini API interactions
2. **Updated ChatbotModal** - Now uses Gemini API instead of mock responses
3. **Environment Variable Support** - Ready for API key configuration
4. **Fallback System** - Works with mock responses if API key is not set

## 🚀 Setup Steps

### Step 1: Install the Package

Run this command in your terminal:

```bash
npm install @google/generative-ai
```

### Step 2: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" → "Create API Key"
4. Copy your API key

### Step 3: Create Environment File

Create a file named `.env` in the root of your project (same folder as `package.json`):

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Important:** Replace `your_actual_api_key_here` with the actual API key you copied.

### Step 4: Restart Your Server

Stop your current dev server (Ctrl+C) and restart it:

```bash
npm run dev
```

### Step 5: Test It!

1. Open your app in the browser
2. Click the chat button
3. Send a message like "Hello" or "What are your store hours?"
4. You should get an AI response from Gemini! 🎉

## 📝 Files Modified/Created

- ✅ `src/lib/gemini.ts` - New Gemini API service
- ✅ `src/components/ChatbotModal.tsx` - Updated to use Gemini
- ✅ `package.json` - Added `@google/generative-ai` dependency
- ✅ `.gitignore` - Added `.env` to prevent committing API keys
- ✅ `GEMINI_SETUP.md` - Detailed setup guide
- ✅ `README.md` - Updated with Gemini setup info

## 🔧 How It Works

1. **With API Key**: The chatbot uses Google Gemini API for intelligent, contextual responses
2. **Without API Key**: The chatbot falls back to mock responses (still functional)

## ⚠️ Troubleshooting

**Error: "Gemini API key is not configured"**
- Make sure `.env` file exists in project root
- Check variable name is exactly `VITE_GEMINI_API_KEY`
- Restart dev server after creating `.env`

**Error: "Invalid API key"**
- Double-check you copied the entire key
- No extra spaces around the `=` sign
- Verify key is active in Google AI Studio

**Still using mock responses?**
- Check browser console for errors
- Verify `.env` file is in the correct location
- Make sure you restarted the server

## 🎯 Next Steps

Once Gemini is working:
- Customize the system prompt in `src/lib/gemini.ts` to match your business
- Adjust conversation history length (currently 10 messages)
- Test with various customer queries
- Monitor API usage in Google Cloud Console

## 📚 More Info

See `GEMINI_SETUP.md` for detailed documentation and advanced configuration.
