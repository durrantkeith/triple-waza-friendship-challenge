# Deploying to Vercel (Alternative to Netlify)

If you prefer Vercel over Netlify, follow this guide.

## Prerequisites

- GitHub account with your repository
- Vercel account (sign up at https://vercel.com)
- Supabase project set up

## Step-by-Step Deployment

### 1. Create Vercel Account

1. Go to https://vercel.com
2. Sign up with your GitHub account
3. Authorize Vercel to access your repositories

### 2. Import Your Project

1. Click "Add New..." > "Project"
2. Select your repository: `durrantkeith/triple-waza-friendship-challenge`
3. Click "Import"

### 3. Configure Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Vite
- **Build Command**: `vite build` or `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Add Environment Variables

Click "Environment Variables" and add:

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)

**Variable 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: Your Supabase anon/public key

### 5. Deploy

1. Click "Deploy"
2. Wait for build to complete (usually 1-2 minutes)
3. Your site will be live at: `https://your-project-name.vercel.app`

## Configure Custom Domain (Optional)

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel
5. Wait for DNS propagation (can take up to 48 hours)

## Vercel-Specific Configuration

### Create vercel.json

If you need custom configuration, create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

To trigger a new deployment:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

## Environment Variables for Different Environments

Vercel supports different environments:

1. **Production**: Used for main branch deployments
2. **Preview**: Used for pull request previews
3. **Development**: Used locally

To set environment-specific variables:
1. Go to Project Settings > Environment Variables
2. Add your variable
3. Select which environments it applies to

## Vercel CLI (Optional)

Install Vercel CLI for local development:

```bash
npm i -g vercel
```

Link your project:
```bash
vercel link
```

Pull environment variables:
```bash
vercel env pull
```

Deploy from CLI:
```bash
vercel --prod
```

## Monitoring and Analytics

### Enable Vercel Analytics

1. Go to your project dashboard
2. Click "Analytics" tab
3. Click "Enable Analytics"
4. Add analytics script to your app (optional)

### View Logs

1. Go to your project dashboard
2. Click "Deployments"
3. Click on any deployment
4. View "Functions" logs or "Build" logs

## Vercel vs Netlify Comparison

### Vercel Advantages:
- Faster build times
- Built-in serverless functions
- Edge functions with low latency
- Excellent Next.js integration
- Real-time collaboration features

### Netlify Advantages:
- More generous free tier
- Better form handling
- Split testing built-in
- More deployment plugins

Choose based on your specific needs!

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Run `npm run build` locally to test
3. Verify all dependencies are in package.json
4. Check Node.js version compatibility

### Environment Variables Not Working

1. Verify variables start with `VITE_`
2. Redeploy after adding variables
3. Check variable values don't have extra spaces
4. Verify environment scope (Production/Preview/Development)

### Site Loads But No Data

1. Check browser console for errors
2. Verify Supabase credentials are correct
3. Check Supabase project is running
4. Verify RLS policies allow public access where needed

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- Vercel Support: support@vercel.com

## Rollback Deployment

If something goes wrong:

1. Go to "Deployments" tab
2. Find a previous working deployment
3. Click "..." menu
4. Select "Promote to Production"

## Summary

Your site is now deployed on Vercel!

- **Production URL**: Check your Vercel dashboard
- **Admin Panel**: `your-domain.vercel.app/admin`
- **Automatic deployments**: Enabled on push to main

Enjoy your deployment on Vercel!
