# Supabase Authentication Setup Guide

This guide will help you complete the Supabase authentication setup for RetailBot.

## Step 1: Update Your .env File

Add your Supabase credentials to your `.env` file in the project root:

```env
# Google Gemini API Configuration
VITE_GEMINI_API_KEY=AIzaSyD8TMDlFcIffZp55OpIBQvw4TIVv2TgnU0

# Supabase Configuration
VITE_SUPABASE_URL=https://eujjfvtcdfghavmwhzuz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1ampmdnRjZGZnaGF2bXdoenV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1ODA1MTMsImV4cCI6MjA4MzE1NjUxM30.4iuASUW_2IwbPk2-1nGG4pG_sycXTrXcHqw_-vNdrmo
```

**Important:** 
- Make sure there are no spaces around the `=` signs
- Don't add quotes around the values
- The `.env` file should be in the root folder (same level as `package.json`)

## Step 2: Restart Your Development Server

After updating the `.env` file, restart your server:

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Step 3: Configure Supabase Database

### Enable Email Authentication

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `eujjfvtcdfghavmwhzuz`
3. Navigate to **Authentication** → **Providers**
4. Make sure **Email** provider is enabled
5. Configure email settings:
   - **Enable email confirmations**: You can disable this for testing, or keep it enabled for production
   - **Site URL**: Set to `http://localhost:8080` for development
   - **Redirect URLs**: Add `http://localhost:8080/**` for development

### Optional: Set Up User Metadata

The signup process stores the user's full name in the `user_metadata` field. You can access this in your Supabase dashboard under **Authentication** → **Users**.

## Step 4: Test Authentication

1. **Test Sign Up:**
   - Go to `/auth` page
   - Click "Sign Up" tab
   - Enter your name, email, and password
   - Click "Create Account"
   - If email confirmation is enabled, check your email

2. **Test Sign In:**
   - Go to `/auth` page
   - Enter your email and password
   - Click "Login"
   - You should be redirected to the home page

3. **Test Password Reset:**
   - Click "Forgot password?" on the login page
   - Enter your email
   - Check your email for reset instructions

## Features Implemented

✅ **Sign Up** - Create new user accounts with email and password
✅ **Sign In** - Login with email and password
✅ **Sign Out** - Logout functionality (can be added to Navbar)
✅ **Password Reset** - Send password reset emails
✅ **Session Management** - Automatic session handling
✅ **User Metadata** - Stores full name during signup
✅ **Error Handling** - User-friendly error messages

## Next Steps

### Add Logout Button

You can add a logout button to your Navbar component:

```tsx
import { useAuth } from "@/contexts/AuthContext";

// In your Navbar component:
const { user, signOut } = useAuth();

// Add logout button when user is logged in
{user && (
  <Button onClick={signOut}>Logout</Button>
)}
```

### Protect Routes

You can create protected routes that require authentication:

```tsx
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" />;
  
  return <>{children}</>;
}
```

### Access User Data

You can access the current user anywhere in your app:

```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, session } = useAuth();
  
  console.log(user?.email);
  console.log(user?.user_metadata?.full_name);
}
```

## Troubleshooting

### "Supabase is not configured" Error

- Make sure your `.env` file exists in the project root
- Verify variable names are exactly `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart your development server after creating/modifying `.env`

### "Invalid login credentials" Error

- Check that the email and password are correct
- Verify the user exists in Supabase dashboard
- If email confirmation is enabled, make sure the email is verified

### Email Not Sending

- Check Supabase dashboard → Settings → Auth → Email Templates
- Verify SMTP settings if using custom email provider
- Check spam folder

### Session Not Persisting

- Check browser console for errors
- Verify cookies are enabled in your browser
- Check Supabase dashboard → Settings → Auth → Session Settings

## Security Notes

- The `anon` key is safe to use in client-side code (it's public)
- Never commit your `.env` file to version control
- For production, set environment variables in your hosting platform
- Consider enabling Row Level Security (RLS) in Supabase for database access

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase project is active
3. Check Supabase dashboard logs
4. Review [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
