# Netlify Environment Variables Setup

This guide shows you exactly how to add environment variables to your Netlify deployment.

## Required Environment Variables

You need to add these two variables to Netlify:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## Step-by-Step Instructions

### 1. Access Your Netlify Site Settings

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click on your site: **triplewazachallenge-e54bb4**
3. Click **Site settings** in the top navigation

### 2. Navigate to Environment Variables

1. In the left sidebar, click **Environment variables** (under "Build & deploy")
2. Click the **Add a variable** button

### 3. Add VITE_SUPABASE_URL

1. Click **Add a variable**
2. Select **Add a single variable**
3. **Key**: `VITE_SUPABASE_URL`
4. **Values**: Paste your Supabase project URL
   - Format: `https://xxxxxxxxxxxxx.supabase.co`
   - Find it in: [Supabase Dashboard](https://app.supabase.com) > Project Settings > API
5. **Scopes**: Leave as "All" (or select specific contexts)
6. Click **Create variable**

### 4. Add VITE_SUPABASE_ANON_KEY

1. Click **Add a variable** again
2. Select **Add a single variable**
3. **Key**: `VITE_SUPABASE_ANON_KEY`
4. **Values**: Paste your Supabase anon/public key
   - Format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)
   - Find it in: [Supabase Dashboard](https://app.supabase.com) > Project Settings > API > anon public
5. **Scopes**: Leave as "All"
6. Click **Create variable**

### 5. Trigger a Redeploy

After adding environment variables, you need to redeploy:

1. Go to **Deploys** tab
2. Click **Trigger deploy** dropdown
3. Select **Clear cache and deploy site**

## Finding Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click the **Settings** icon (gear) in the sidebar
4. Click **API** in the settings menu
5. Copy these values:
   - **Project URL** → Use for `VITE_SUPABASE_URL`
   - **anon public** key → Use for `VITE_SUPABASE_ANON_KEY`

## Verification

After deploying, verify the environment variables are working:

1. Visit your site: https://triplewazachallenge.netlify.app
2. Open browser console (F12)
3. Check for Supabase connection errors
4. If you see authentication or database errors, double-check your environment variables

## Common Issues

### Issue: Site deploys but shows errors

**Solution**: Check that you copied the complete environment variable values without extra spaces or characters.

### Issue: Database not connecting

**Solution**: Verify your Supabase project is active and the URL/key match exactly.

### Issue: Changes not appearing

**Solution**: Clear cache and redeploy. Environment variables are only loaded during build time.

## Security Notes

- ✅ The `anon` key is safe to expose in the frontend
- ✅ Never commit `.env` or `.env.local` files to git
- ✅ Netlify encrypts environment variables
- ✅ Row Level Security (RLS) in Supabase protects your data

## Optional: Deploy Previews

If you want environment variables in deploy previews:

1. In Environment variables settings
2. For each variable, click **Options** (⋯)
3. Select **Change variable scopes**
4. Check **Deploy Previews**
5. Click **Save**

## Need Help?

- [Netlify Environment Variables Docs](https://docs.netlify.com/environment-variables/overview/)
- [Supabase Documentation](https://supabase.com/docs)
- Open an issue in the GitHub repository
