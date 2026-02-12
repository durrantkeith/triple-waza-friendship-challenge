# Social Media Credentials Quick Guide

This is a condensed reference for obtaining social media credentials. For detailed setup instructions, see `SOCIAL_MEDIA_SETUP.md`.

## Facebook Page ID

1. Visit your Facebook Page
2. Click Settings > Page Info
3. Copy the Page ID

**Quick Link:** `https://www.facebook.com/[your-page]/about`

## Facebook Access Token

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create app > Add Graph API product
3. Tools > Graph API Explorer
4. Select your app and page
5. Click "Generate Access Token"
6. Add permissions: `pages_manage_posts`, `pages_read_engagement`, `pages_show_list`
7. Copy token
8. [Extend to 60 days](https://developers.facebook.com/tools/debug/accesstoken/)

**Expires:** 60 days (with extension)

## Instagram User ID

**Prerequisites:** Instagram Business Account linked to Facebook Page

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Query: `me/accounts` → Copy your page ID
3. Query: `[page-id]?fields=instagram_business_account`
4. Copy the `instagram_business_account.id`

## Instagram Access Token

Same as Facebook Access Token, but ensure it has these additional permissions:
- `instagram_basic`
- `instagram_content_publish`

**Expires:** 60 days (same as Facebook token)

## YouTube Access Token

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project > Enable "YouTube Data API v3"
3. Create OAuth 2.0 credentials
4. Add redirect URI: `https://developers.google.com/oauthplayground`
5. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
6. Settings > Use your own OAuth credentials
7. Select scope: `https://www.googleapis.com/auth/youtube.upload`
8. Authorize APIs > Exchange authorization code for tokens
9. Copy the Access Token

**Expires:** 1 hour (save the Refresh Token for auto-renewal)

**Refresh Token URL:** `https://oauth2.googleapis.com/token`
```json
{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "refresh_token": "YOUR_REFRESH_TOKEN",
  "grant_type": "refresh_token"
}
```

## YouTube Channel ID

1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Settings > Channel > Advanced settings
3. Copy Channel ID

**Quick Link:** `youtube.com/account_advanced`

## Where to Add Credentials

All credentials must be added to Supabase:

1. Open [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Project Settings > Edge Functions > Secrets
4. Add each credential as a new secret

## Required Secrets in Supabase

```
FACEBOOK_PAGE_ID=your_page_id_here
FACEBOOK_ACCESS_TOKEN=your_facebook_token_here
INSTAGRAM_USER_ID=your_instagram_id_here
INSTAGRAM_ACCESS_TOKEN=your_instagram_token_here
YOUTUBE_ACCESS_TOKEN=your_youtube_token_here
```

## Token Refresh Schedule

| Platform | Frequency | Method |
|----------|-----------|--------|
| Facebook | Every 60 days | Regenerate in Graph API Explorer |
| Instagram | Every 60 days | Same as Facebook |
| YouTube | Daily or as needed | Use OAuth Playground or Refresh Token |

## Common Errors

**Facebook: "Invalid OAuth access token"**
→ Token expired. Regenerate and update in Supabase.

**Instagram: "Instagram account not found"**
→ Verify Business Account and Facebook Page connection.

**YouTube: "Invalid Credentials"**
→ Token expired (1 hour limit). Refresh the token.

**All: "Permission denied"**
→ Check token has required permissions.

## Platform-Specific Requirements

### Facebook
- Page must be published (not in draft mode)
- Video max size: 4GB
- Supported formats: MP4, MOV

### Instagram
- Must be Business or Creator account
- Must be linked to Facebook Page
- Video length: Max 60 seconds for Reels
- Aspect ratio: 1:1 recommended

### YouTube
- Account must be verified
- Video max size: 256GB
- Daily quota: 10,000 units (1 upload ≈ 1,600 units)
- Formats: MP4, AVI, MOV, WMV, FLV, 3GP

## Quick Test

After setup, test with the admin dashboard:

1. Approve a test submission
2. Click "Upload to Social Media"
3. Check for success messages
4. Verify posts appear on each platform
5. Confirm links work in admin panel

## Support Links

- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [Instagram API](https://developers.facebook.com/docs/instagram-api)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

## Need Help?

See `SOCIAL_MEDIA_SETUP.md` for:
- Detailed step-by-step setup instructions
- Comprehensive troubleshooting guide
- Token refresh implementation
- Security best practices
