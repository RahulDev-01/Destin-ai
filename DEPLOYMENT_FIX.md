# Fix Google OAuth "Access Blocked" in Deployment

## Problem
The "Access Blocked" error occurs when Google OAuth is not properly configured for your deployed domain.

## Solution Steps

### 1. Google Cloud Console Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Credentials"
4. Find your OAuth 2.0 Client ID
5. Click "Edit" (pencil icon)

### 2. Add Authorized Domains

In the OAuth client configuration, add these to **Authorized JavaScript origins**:
```
https://your-domain.vercel.app
https://your-domain.netlify.app
https://your-custom-domain.com
```

Add these to **Authorized redirect URIs**:
```
https://your-domain.vercel.app
https://your-domain.netlify.app
https://your-custom-domain.com
```

### 3. Environment Variables

Create a `.env` file in your project root:
```env
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_GEMINI_AI_API_KEY=your_gemini_api_key_here
```

### 4. Deployment Platform Configuration

#### For Vercel:
1. Go to your project dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add:
   - `VITE_GOOGLE_AUTH_CLIENT_ID` = your_client_id
   - `VITE_GOOGLE_GEMINI_AI_API_KEY` = your_api_key

#### For Netlify:
1. Go to "Site settings" > "Environment variables"
2. Add the same variables as above

### 5. Common Issues & Fixes

**Issue**: "Access Blocked" error
- **Fix**: Add your deployed domain to Google Console

**Issue**: "Invalid client" error
- **Fix**: Check if client ID is correct in environment variables

**Issue**: "Redirect URI mismatch"
- **Fix**: Ensure redirect URI in Google Console matches your domain

**Issue**: Environment variables not loading
- **Fix**: Redeploy after adding environment variables

### 6. Testing

1. Deploy your app
2. Try signing in
3. Check browser console for any errors
4. Verify environment variables are loaded correctly

## Updated OAuth Configuration

The code has been updated with:
- Better error handling
- Proper scopes
- User-friendly error messages
- Success notifications

## Support

If issues persist:
1. Check browser console for detailed errors
2. Verify Google Console configuration
3. Ensure environment variables are set correctly
4. Try incognito/private browsing mode
