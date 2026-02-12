# 🚀 Deployment Guide - Triple Waza Challenge

Your project is now ready to go live! Follow these steps to deploy.

## ✅ What's Already Done

- ✅ Project builds successfully
- ✅ Supabase database is configured and live
- ✅ Edge function `send-challenge-emails` is deployed
- ✅ Production build is ready in the `dist/` folder
- ✅ Netlify redirect rules are configured

## 📋 Step-by-Step Deployment

### Step 1: Set Up Email Service (Resend)

Your app sends challenge invitation emails. You need to configure Resend:

1. **Sign up for Resend:**
   - Go to: https://resend.com
   - Create a free account (100 emails/day free)

2. **Get your API key:**
   - After signing up, go to the Resend dashboard
   - Click on "API Keys" in the sidebar
   - Click "Create API Key"
   - Copy the API key (starts with `re_...`)

3. **Add the API key to Supabase:**
   - Go to: https://supabase.com/dashboard
   - Select your project: `fjzlfidikzkomaywqwku`
   - Navigate to: **Project Settings** → **Edge Functions** → **Secrets**
   - Click "Add new secret"
   - Name: `RESEND_API_KEY`
   - Value: Paste your Resend API key
   - Click "Save"

4. **Verify your domain in Resend (recommended):**
   - In Resend dashboard, go to "Domains"
   - Add `onesmallpromise.com` (or your custom domain)
   - Follow the DNS verification steps
   - This will improve email deliverability

---

### Step 2: Deploy to Netlify

#### Option A: Deploy via Netlify CLI (Fastest)

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login to Netlify
netlify login

# 3. Deploy your site
netlify deploy --prod --dir=dist
```

When prompted:
- Choose "Create & configure a new site"
- Select your team
- Choose a site name (or leave blank for random name)

#### Option B: Deploy via Netlify Dashboard (Easiest for beginners)

1. **Go to Netlify:**
   - Visit: https://app.netlify.com
   - Sign up or log in

2. **Import your project:**
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (GitHub, GitLab, Bitbucket)
   - Select your repository

3. **Configure build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - Leave other settings as default

4. **Add environment variables:**
   - Before deploying, click "Show advanced"
   - Click "New variable" for each:

     **Variable 1:**
     - Key: `VITE_SUPABASE_URL`
     - Value: `https://fjzlfidikzkomaywqwku.supabase.co`

     **Variable 2:**
     - Key: `VITE_SUPABASE_ANON_KEY`
     - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqemxmaWRpa3prb21heXdxd2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MjI2NDYsImV4cCI6MjA4NDE5ODY0Nn0.Yu04bAA3qz2DSPR7bfnyLLZuTaeBAz1rDL2qDUqcOOU`

5. **Deploy:**
   - Click "Deploy site"
   - Wait 2-3 minutes for the build to complete
   - Your site will be live at: `https://[random-name].netlify.app`

---

### Step 3: Configure Custom Domain (Optional)

If you own `triplewazachallenge.com`:

1. **In Netlify:**
   - Go to: Site settings → Domain management
   - Click "Add custom domain"
   - Enter: `triplewazachallenge.com`
   - Also add: `www.triplewazachallenge.com`

2. **Update DNS records:**
   - Netlify will show you DNS records to add
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add the DNS records as instructed
   - Wait 24-48 hours for DNS propagation

3. **Enable HTTPS:**
   - Netlify automatically provisions SSL certificates
   - This happens automatically after DNS is configured

---

## 🧪 Post-Deployment Testing

After deployment, test these features:

### Critical Features:
- [ ] Homepage loads correctly
- [ ] Navigation between pages works
- [ ] Challenge submission form submits successfully
- [ ] "Challenge other Dojos" email functionality works
- [ ] Founding Sensei Circle page displays all members
- [ ] Admin dashboard loads (if you have admin access)

### Test URLs:
- Homepage: `https://your-site.netlify.app/`
- Challenge: `https://your-site.netlify.app/challenge`
- Founders: `https://your-site.netlify.app/founding-sensei-circle`

### Email Testing:
1. Go to the "Challenge other Dojos" section
2. Fill out the form with a test email address
3. Check that the email arrives
4. Verify the email formatting looks good

---

## 📊 Monitoring Your Live Site

### Netlify Dashboard:
- **Deploys:** See build status and logs
- **Analytics:** View traffic (requires paid plan)
- **Functions:** Monitor edge function calls
- **Bandwidth:** Track usage

### Supabase Dashboard:
- **Database:** Monitor queries and performance
- **Edge Functions:** View logs and usage
- **Storage:** Check file uploads
- **Auth:** Monitor user signups (if applicable)

### Resend Dashboard:
- **Emails:** Track delivery rates
- **Logs:** See all sent emails
- **Analytics:** View open rates (if configured)

---

## 🆘 Troubleshooting

### Build Fails on Netlify:
- Check that environment variables are set correctly
- Review the build log for specific errors
- Ensure `package.json` has all dependencies

### Email Not Sending:
- Verify `RESEND_API_KEY` is set in Supabase Edge Functions secrets
- Check Resend dashboard for error messages
- Verify domain is verified in Resend

### Site Shows 404 Errors:
- Ensure `_redirects` file exists in `dist/` folder
- Check that publish directory is set to `dist`
- Clear browser cache and try again

### Pages Don't Load:
- Check browser console for JavaScript errors
- Verify environment variables are set
- Check Supabase is accessible from your domain

---

## 🎉 You're Live!

Once deployed, share your site:
- 🌐 Post on social media
- 📧 Email your dojo members
- 📱 Share with the Judo community
- 🥋 Start collecting challenge submissions!

---

## 📞 Need Help?

If you run into issues:
1. Check the troubleshooting section above
2. Review Netlify deploy logs
3. Check Supabase dashboard for errors
4. Review browser console for frontend errors

**Your site URLs:**
- Supabase Project: https://supabase.com/dashboard/project/fjzlfidikzkomaywqwku
- Edge Function Dashboard: https://supabase.com/dashboard/project/fjzlfidikzkomaywqwku/functions

Good luck with your launch! 🚀
