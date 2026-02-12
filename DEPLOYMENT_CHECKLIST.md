# Deployment Checklist

Follow this checklist to deploy your Triple Waza Friendship Challenge platform to production.

## Pre-Deployment Checklist

### 1. GitHub Setup

- [ ] Create GitHub Personal Access Token
  - Go to https://github.com/settings/tokens
  - Generate new token (classic)
  - Select `repo` scope
  - Copy token (format: `ghp_xxxxx...`)

- [ ] Push code to GitHub
  ```bash
  git remote set-url origin https://YOUR_TOKEN@github.com/durrantkeith/triple-waza-friendship-challenge.git
  git push -u origin main
  ```

### 2. Supabase Setup

- [ ] Verify Supabase project is active
  - Visit [Supabase Dashboard](https://app.supabase.com)
  - Confirm project is running

- [ ] Run all migrations
  - All migrations in `supabase/migrations/` should be applied
  - Check in Supabase Dashboard > SQL Editor > Migrations

- [ ] Configure authentication
  - Dashboard > Authentication > Providers
  - Enable Email provider
  - Disable email confirmation (for testing)
  - Configure email templates (optional)

- [ ] Set up storage buckets
  - `videos` bucket for video submissions
  - `founders` bucket for founder photos
  - Verify public access policies

- [ ] Create admin user
  ```bash
  node create-admin.mjs your-email@example.com
  ```

- [ ] Copy API credentials
  - Dashboard > Settings > API
  - Copy Project URL
  - Copy anon/public key

### 3. Netlify Setup

- [ ] Connect GitHub repository
  - Log in to [Netlify](https://app.netlify.com)
  - Sites > Add new site > Import an existing project
  - Choose GitHub
  - Select: `durrantkeith/triple-waza-friendship-challenge`
  - Build settings auto-detected from `netlify.toml`

- [ ] Configure environment variables
  - Site settings > Environment variables
  - Add `VITE_SUPABASE_URL` = your Supabase project URL
  - Add `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
  - See `NETLIFY_ENV_SETUP.md` for detailed instructions

- [ ] Configure custom domain (optional)
  - Site settings > Domain management
  - Add custom domain
  - Update DNS records as instructed

- [ ] Deploy site
  - Click "Deploy site"
  - Wait for build to complete
  - Verify no build errors

## Post-Deployment Verification

### 4. Test Core Functionality

- [ ] Visit deployed site
  - Open: https://triplewazachallenge.netlify.app
  - Verify homepage loads

- [ ] Test navigation
  - Click through all main navigation links
  - Verify all pages load without errors

- [ ] Test video submission
  - Go to Challenge page
  - Try submitting a test video
  - Verify upload works

- [ ] Test admin login
  - Go to `/admin`
  - Login with admin credentials
  - Verify dashboard loads

- [ ] Test database connectivity
  - Check if data loads (founders, submissions, etc.)
  - Open browser console (F12)
  - Look for any Supabase errors

### 5. Performance & SEO

- [ ] Run Lighthouse audit
  - Open Chrome DevTools
  - Lighthouse tab
  - Generate report
  - Target: 90+ scores

- [ ] Test mobile responsiveness
  - Test on actual mobile device
  - Or use Chrome DevTools device emulation

- [ ] Verify meta tags
  - View page source
  - Check title, description, Open Graph tags

### 6. Security Verification

- [ ] Verify RLS policies
  - Supabase Dashboard > Authentication > Policies
  - All tables should have RLS enabled
  - Test that non-admins can't delete content

- [ ] Test file upload restrictions
  - Try uploading large files
  - Try uploading non-video files
  - Verify validations work

- [ ] Check environment variables
  - Verify no secrets in client-side code
  - Check `.env` is in `.gitignore`

### 7. Monitoring Setup

- [ ] Enable Netlify analytics (optional)
  - Site settings > Analytics
  - Enable if desired

- [ ] Set up error monitoring
  - Check Netlify deploy logs
  - Set up notifications for failed deploys

- [ ] Configure uptime monitoring (optional)
  - Use service like UptimeRobot or Pingdom
  - Monitor main URL

## Ongoing Maintenance

### Regular Tasks

- [ ] Weekly: Check for spam submissions
- [ ] Weekly: Review admin dashboard for content
- [ ] Monthly: Check Supabase database size
- [ ] Monthly: Review Netlify bandwidth usage
- [ ] As needed: Update dependencies
  ```bash
  npm update
  npm audit fix
  ```

### Updating Content

To update content after initial deploy:

1. Make changes locally
2. Test with `npm run dev`
3. Commit changes
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```
4. Netlify auto-deploys within 2-3 minutes

## Troubleshooting

### Build Fails on Netlify

1. Check build logs in Netlify
2. Look for TypeScript errors
3. Run `npm run build` locally first
4. Fix errors and push again

### Site Loads But No Data

1. Check browser console for errors
2. Verify environment variables in Netlify
3. Verify Supabase project is running
4. Check RLS policies aren't blocking access

### Authentication Not Working

1. Verify admin user was created
2. Check Supabase Auth settings
3. Verify email provider is enabled
4. Check browser console for auth errors

### Videos Not Uploading

1. Check storage bucket policies
2. Verify bucket exists and is public
3. Check file size limits
4. Look for CORS errors in console

## Quick Commands Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint

# Preview production build
npm run preview

# Create admin user
node create-admin.mjs email@example.com

# Add founding members
node add-founding-members.mjs
```

## Support Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)

## Deployment Complete!

Once all items are checked, your site is fully deployed and ready for production use.

**Live URL**: https://triplewazachallenge.netlify.app
**Admin URL**: https://triplewazachallenge.netlify.app/admin

Congratulations on deploying the Triple Waza Friendship Challenge platform!
