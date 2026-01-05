# Quick Fix: Supabase Not Configured Error

## The Problem
You're seeing "Supabase is not configured" because the `.env` file is missing or not set up correctly.

## Solution: Create/Update Your .env File

### Step 1: Check if .env file exists
1. Open your project folder: `C:\Users\ADMIN\retail-support-bot`
2. Look for a file named `.env` (it might be hidden)
3. If you don't see it, you need to create it

### Step 2: Create the .env File

**Option A: Using VS Code/Cursor (Easiest)**
1. In the file explorer (left sidebar), right-click on the root folder (`retail-support-bot`)
2. Click "New File"
3. Type exactly: `.env` (with the dot at the beginning)
4. Press Enter

**Option B: Using File Explorer**
1. Open File Explorer
2. Go to: `C:\Users\ADMIN\retail-support-bot`
3. Right-click → New → Text Document
4. Rename it to `.env` (remove `.txt` extension)
   - Windows will warn you - click "Yes"

### Step 3: Add This Content to .env File

Open the `.env` file and paste this EXACT content:

```env
VITE_GEMINI_API_KEY=AIzaSyD8TMDlFcIffZp55OpIBQvw4TIVv2TgnU0
VITE_SUPABASE_URL=https://eujjfvtcdfghavmwhzuz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1ampmdnRjZGZnaGF2bXdoenV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1ODA1MTMsImV4cCI6MjA4MzE1NjUxM30.4iuASUW_2IwbPk2-1nGG4pG_sycXTrXcHqw_-vNdrmo
```

**CRITICAL:**
- ✅ No spaces around the `=` signs
- ✅ No quotes around the values
- ✅ Each variable on its own line
- ✅ File must be named exactly `.env` (not `.env.txt`)

### Step 4: Save the File
Press `Ctrl + S` to save

### Step 5: Restart Your Server
**THIS IS VERY IMPORTANT!**

1. Go to your terminal where `npm run dev` is running
2. Press `Ctrl + C` to stop the server
3. Start it again:
   ```bash
   npm run dev
   ```

### Step 6: Test Again
1. Go to `/auth` page
2. Try to sign up or login
3. It should work now!

## Verify It's Working

After restarting, check the browser console (F12):
- If you see: "Supabase environment variables are not set" → The .env file isn't being read
- If you DON'T see that warning → It's working!

## Still Not Working?

1. **Check file location**: `.env` must be in the same folder as `package.json`
2. **Check file name**: Must be exactly `.env` (not `.env.txt` or `env.txt`)
3. **Check content**: Copy the exact content from Step 3 above
4. **Restart server**: Always restart after changing `.env`
5. **Check terminal**: Look for any error messages when starting the server

## File Structure Should Look Like This:

```
retail-support-bot/
├── .env                    ← MUST BE HERE
├── package.json
├── src/
├── public/
└── ...
```
