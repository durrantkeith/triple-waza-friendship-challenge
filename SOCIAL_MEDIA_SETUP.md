# Social Media Auto-Upload Setup Guide

This guide explains how to set up automatic uploads to Facebook, Instagram, and YouTube when videos are approved in the admin dashboard.

## Overview

When a submission is approved, admins can click the "Upload to Social Media" button to automatically post the video to your Triple Waza Friendship Challenge social media channels.

## Required Environment Variables

The edge function requires the following environment variables to be configured in your Supabase project. These need to be set in the Supabase Dashboard under Project Settings > Edge Functions > Secrets.

### Facebook

1. **FACEBOOK_PAGE_ID**: Your Facebook Page ID
2. **FACEBOOK_ACCESS_TOKEN**: Facebook Page Access Token with `pages_manage_posts` and `pages_read_engagement` permissions

### Instagram

1. **INSTAGRAM_USER_ID**: Your Instagram Business Account User ID
2. **INSTAGRAM_ACCESS_TOKEN**: Instagram Access Token with `instagram_basic` and `instagram_content_publish` permissions

### YouTube

1. **YOUTUBE_ACCESS_TOKEN**: OAuth 2.0 Access Token with YouTube upload permissions

## Setup Instructions

### 1. Facebook Setup

#### Step 1: Get Your Facebook Page ID

1. Go to your Facebook Page
2. Click on "Settings" (gear icon)
3. Click "Page Info" in the left sidebar
4. Scroll down to find "Page ID"
5. Copy the Page ID

**Alternative Method:**
- Visit `https://www.facebook.com/[your-page-name]/about`
- Look for the Page ID in the "About" section

#### Step 2: Create Facebook App and Get Access Token

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" > "Create App"
3. Select "Business" as the app type
4. Fill in app details and create
5. In the app dashboard, add "Facebook Login" and "Facebook Graph API" products
6. Go to "Tools" > "Graph API Explorer"
7. Select your app from the dropdown
8. Click "Generate Access Token"
9. Add these permissions:
   - `pages_manage_posts`
   - `pages_read_engagement`
   - `pages_show_list`
10. Click "Generate Access Token" and authorize
11. Copy the access token

#### Step 3: Convert to Long-Lived Token

Short-lived tokens expire in 1 hour. Convert to long-lived (60 days):

1. Go to [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)
2. Paste your token
3. Click "Extend Access Token"
4. Copy the new long-lived token

#### Step 4: Configure in Supabase

1. Go to your Supabase Dashboard
2. Navigate to Project Settings > Edge Functions > Secrets (or use the Supabase CLI)
3. Add these secrets:
   - `FACEBOOK_PAGE_ID`: Your Page ID from Step 1
   - `FACEBOOK_ACCESS_TOKEN`: Your long-lived token from Step 3

### 2. Instagram Setup

**Prerequisites:**
- Instagram account must be a Business or Creator account
- Must be linked to a Facebook Page

#### Step 1: Convert to Business Account

1. Open Instagram app
2. Go to Settings > Account
3. Tap "Switch to Professional Account"
4. Choose "Business" or "Creator"
5. Link to your Facebook Page

#### Step 2: Get Instagram User ID

1. Go to [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your Facebook app
3. Make sure you have a Page Access Token (from Facebook setup)
4. Enter this query: `me/accounts`
5. Click "Submit"
6. Find your page in the results and copy its `id`
7. Enter this query: `[page-id]?fields=instagram_business_account`
8. The returned `instagram_business_account.id` is your Instagram User ID

#### Step 3: Get Access Token

The Instagram Access Token is the same as your Facebook Page Access Token if you've added these permissions:
- `instagram_basic`
- `instagram_content_publish`
- `pages_read_engagement`

If you haven't added these, go back to Graph API Explorer and add them to your token.

#### Step 4: Configure in Supabase

Add these secrets to Supabase Dashboard (Project Settings > Edge Functions > Secrets):
- `INSTAGRAM_USER_ID`: Your Instagram Business Account ID
- `INSTAGRAM_ACCESS_TOKEN`: Your Facebook Page Access Token (with Instagram permissions)

### 3. YouTube Setup (OAuth 2.0)

YouTube requires OAuth 2.0 for video uploads. This is more complex than Facebook/Instagram.

#### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" > "New Project"
3. Enter project name: "Triple Waza Challenge"
4. Click "Create"

#### Step 2: Enable YouTube Data API v3

1. In your project, go to "APIs & Services" > "Library"
2. Search for "YouTube Data API v3"
3. Click on it and press "Enable"

#### Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: "Triple Waza Challenge"
   - User support email: Your email
   - Developer contact: Your email
   - Add scopes: `https://www.googleapis.com/auth/youtube.upload`
   - Add test users: Your YouTube account email
4. Application type: "Web application"
5. Name: "Triple Waza Challenge Uploader"
6. Authorized redirect URIs: `https://developers.google.com/oauthplayground`
7. Click "Create"
8. Copy the Client ID and Client Secret

#### Step 4: Get Access Token Using OAuth 2.0 Playground

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon (settings) in the top right
3. Check "Use your own OAuth credentials"
4. Enter your Client ID and Client Secret from Step 3
5. In the left sidebar, find "YouTube Data API v3"
6. Select `https://www.googleapis.com/auth/youtube.upload`
7. Click "Authorize APIs"
8. Sign in with your YouTube account
9. Click "Exchange authorization code for tokens"
10. Copy the "Access token"

**Important:** Access tokens expire after 1 hour. For production use, you should:
- Store the "Refresh token" (also provided in the playground)
- Implement token refresh logic in your edge function
- Or manually refresh tokens periodically

#### Step 5: Get Your YouTube Channel ID

1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Click your profile > "Settings"
3. Click "Channel" > "Advanced settings"
4. Your Channel ID is displayed there

**Alternative:** Visit `youtube.com/account_advanced`

#### Step 6: Configure in Supabase

Add this secret to Supabase Dashboard (Project Settings > Edge Functions > Secrets):
- `YOUTUBE_ACCESS_TOKEN`: Your OAuth 2.0 access token from Step 4

**Note:** You'll need to refresh this token regularly as it expires.

## Token Refresh for YouTube

YouTube access tokens expire after 1 hour. For continuous operation, you have two options:

### Option 1: Manual Token Refresh (Simple)

When the token expires, manually refresh it:

1. Go back to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. If you still have your refresh token, enter it in the "Refresh access token" section
3. Click "Refresh access token"
4. Update the `YOUTUBE_ACCESS_TOKEN` secret in Supabase

### Option 2: Automatic Token Refresh (Advanced)

Store the refresh token and implement automatic refresh in the edge function:

1. Add a new secret: `YOUTUBE_REFRESH_TOKEN` (from OAuth playground)
2. Add secrets: `YOUTUBE_CLIENT_ID` and `YOUTUBE_CLIENT_SECRET`
3. Modify the edge function to refresh the token when it expires
4. The refresh token is long-lived and can be used repeatedly

**Refresh Token Request Example:**
```javascript
const response = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    client_id: YOUTUBE_CLIENT_ID,
    client_secret: YOUTUBE_CLIENT_SECRET,
    refresh_token: YOUTUBE_REFRESH_TOKEN,
    grant_type: 'refresh_token'
  })
});
const { access_token } = await response.json();
```

## How It Works

### Database Schema

The `submissions` table has been updated with the following columns:

- `facebook_url` (text): URL of the Facebook post
- `instagram_url` (text): URL of the Instagram post
- `youtube_url` (text): URL of the YouTube video (automatically populated after upload)
- `social_media_uploaded_at` (timestamptz): Timestamp of when the video was uploaded
- `social_media_upload_error` (text): Any errors that occurred during upload

### Edge Function

The `upload-to-social-media` edge function:

1. Fetches the approved submission details
2. Retrieves the video URL (either from YouTube submission or uploaded file)
3. Creates appropriate captions with dojo information
4. Uploads to each configured platform
5. Updates the submission record with the posted URLs
6. Handles errors gracefully for each platform

### Admin Interface

In the Admin Dashboard:

1. Navigate to the submissions list
2. Find an approved submission
3. Click "Upload to Social Media" button
4. The system will attempt to upload to all configured platforms
5. View the posted links directly in the admin panel
6. Any errors are displayed for troubleshooting

## Video Caption Format

Videos are posted with the following caption template:

```
🥋 Triple Waza Friendship Challenge

[Dojo Name] from [City], [Country]

[Optional message from the dojo]

#TripleWazaChallenge #Judo #MartialArts #JudoCommunity
```

## Testing

To test the integration:

1. Approve a test submission
2. Click the "Upload to Social Media" button
3. Check the alert message for success/errors
4. Verify the links appear in the admin panel
5. Visit each platform to confirm the posts

## Troubleshooting

### Facebook Issues

**Error: "Invalid OAuth access token"**
- Your access token has expired
- Generate a new long-lived token using the steps above
- Update the `FACEBOOK_ACCESS_TOKEN` secret in Supabase

**Error: "Permissions error"**
- Your token doesn't have the required permissions
- Go back to Graph API Explorer
- Regenerate token with `pages_manage_posts` and `pages_read_engagement` permissions

**Error: "Video upload failed"**
- Check video file size (max 4GB for Facebook)
- Ensure video format is supported (MP4, MOV recommended)
- Video must be accessible via public URL

### Instagram Issues

**Error: "Instagram account not found"**
- Verify your Instagram account is converted to Business
- Ensure it's linked to your Facebook Page
- Check the Instagram User ID is correct

**Error: "Media not ready"**
- Instagram processes videos asynchronously
- The container creation succeeded but publishing failed
- Wait a few minutes and check Instagram manually
- Videos over 60 seconds will be posted as IGTV

**Error: "Instagram publish failed"**
- Check video specifications: 1:1 ratio recommended, max 60 seconds for Reels
- Ensure access token has `instagram_content_publish` permission

### YouTube Issues

**Error: "Invalid Credentials"**
- Your OAuth access token has expired (tokens last 1 hour)
- Refresh the token using the OAuth Playground
- Or implement automatic refresh using refresh token

**Error: "Insufficient Permission"**
- Token doesn't have upload permission
- Regenerate token with `https://www.googleapis.com/auth/youtube.upload` scope

**Error: "Video quota exceeded"**
- YouTube has daily upload quotas
- New projects have lower quotas (10,000 units/day)
- Request quota increase from Google Cloud Console
- Each video upload costs approximately 1,600 quota units

**Error: "Upload failed - FormData not supported"**
- This is a Deno environment limitation
- The edge function downloads the video and re-uploads it
- Ensure the video URL is publicly accessible

### General Issues

**Error: "Submission not found"**
- The submission ID is invalid
- Check that the submission exists in the database

**Error: "Only approved submissions can be uploaded"**
- The submission status is not "approved"
- Approve the submission first before attempting upload

**Error: "No video URL or file path found"**
- The submission has neither a YouTube URL nor uploaded video file
- Ensure the submission has a valid video source

### Rate Limiting

All platforms have rate limits:
- **Facebook**: 200 calls per hour per user
- **Instagram**: 25 posts per day per account
- **YouTube**: 10,000 quota units per day (varies by account age)

Space out uploads if posting many videos.

### Checking Logs

View detailed error logs in Supabase:
1. Go to Supabase Dashboard
2. Navigate to Edge Functions > Logs
3. Select `upload-to-social-media` function
4. View real-time logs and errors

### Error Messages

Errors are stored in the `social_media_upload_error` column and displayed in the admin interface. Check these for specific error details from each platform.

## Quick Reference: Required Credentials

Here's a summary of what you need to configure in Supabase Edge Functions Secrets:

| Platform | Secret Name | How to Get It | Expires? |
|----------|------------|---------------|----------|
| Facebook | `FACEBOOK_PAGE_ID` | Facebook Page Settings > Page Info | No |
| Facebook | `FACEBOOK_ACCESS_TOKEN` | Graph API Explorer (long-lived token) | 60 days |
| Instagram | `INSTAGRAM_USER_ID` | Graph API query: `[page-id]?fields=instagram_business_account` | No |
| Instagram | `INSTAGRAM_ACCESS_TOKEN` | Same as Facebook token (with Instagram permissions) | 60 days |
| YouTube | `YOUTUBE_ACCESS_TOKEN` | OAuth 2.0 Playground | 1 hour |

## Security Best Practices

1. **Never commit tokens to version control**
   - All tokens should only exist in Supabase secrets
   - Never add them to `.env` file or code

2. **Use long-lived tokens where possible**
   - Facebook: Convert to 60-day tokens
   - YouTube: Store refresh token for automatic renewal

3. **Limit token permissions**
   - Only grant the minimum required permissions
   - Review permissions regularly

4. **Monitor token usage**
   - Check Supabase Edge Function logs regularly
   - Set up alerts for authentication failures

5. **Rotate tokens periodically**
   - Regenerate Facebook tokens before 60-day expiration
   - Set calendar reminders for token refresh

## Setup Checklist

Use this checklist to track your setup progress:

### Facebook
- [ ] Created Facebook Developers App
- [ ] Added Graph API product
- [ ] Generated Page Access Token with correct permissions
- [ ] Extended token to 60-day expiration
- [ ] Obtained Facebook Page ID
- [ ] Added `FACEBOOK_PAGE_ID` to Supabase secrets
- [ ] Added `FACEBOOK_ACCESS_TOKEN` to Supabase secrets
- [ ] Tested upload with a sample video

### Instagram
- [ ] Converted Instagram to Business Account
- [ ] Linked Instagram to Facebook Page
- [ ] Obtained Instagram User ID via Graph API
- [ ] Verified token has Instagram permissions
- [ ] Added `INSTAGRAM_USER_ID` to Supabase secrets
- [ ] Added `INSTAGRAM_ACCESS_TOKEN` to Supabase secrets
- [ ] Tested upload with a sample video

### YouTube
- [ ] Created Google Cloud Project
- [ ] Enabled YouTube Data API v3
- [ ] Created OAuth 2.0 credentials
- [ ] Configured OAuth consent screen
- [ ] Generated access token via OAuth Playground
- [ ] (Optional) Stored refresh token for auto-renewal
- [ ] Added `YOUTUBE_ACCESS_TOKEN` to Supabase secrets
- [ ] Tested upload with a sample video

## Important Notes

- **Not all platforms required**: The system works with whatever platforms you configure. You can start with just one platform.
- **Independent uploads**: Each platform uploads independently. If one fails, others may still succeed.
- **Resilient**: Videos remain available even if social media upload fails
- **Retryable**: You can retry uploads by clicking the button again
- **No duplicates**: The function doesn't check for duplicate posts. Manual verification recommended.

## Token Expiration Schedule

Set reminders to refresh tokens:

- **Facebook/Instagram**: Every 60 days
- **YouTube**: Daily (or implement auto-refresh)

## Testing Recommendations

Before going live:

1. **Test with private videos** first
2. **Verify captions** format correctly
3. **Check video quality** after upload
4. **Test error handling** by intentionally using wrong credentials
5. **Verify links** work correctly in admin dashboard
6. **Test on all platforms** you've configured

## Production Checklist

Before launching:

- [ ] All tokens configured and tested
- [ ] Token refresh reminders set
- [ ] Error monitoring set up
- [ ] Backup plan for failed uploads
- [ ] Documentation shared with team
- [ ] Admin users trained on the system
