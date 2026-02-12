# 🚀 DEPLOY TO NETLIFY IN 10 MINUTES

## Quick Start - Copy & Paste These Commands

### 1️⃣ Push to GitHub (2 minutes)

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Netlify deployment"

# Create repo on GitHub first: https://github.com/new
# Then connect it (replace YOUR-USERNAME):
git remote add origin https://github.com/YOUR-USERNAME/triple-waza-challenge.git

# Push
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy on Netlify (5 minutes)

1. **Go to:** https://app.netlify.com/signup
2. **Sign up** with GitHub
3. **Click:** "Add new site" → "Import an existing project"
4. **Select:** Your GitHub repo
5. **Add these 2 environment variables:**

```
VITE_SUPABASE_URL
https://fjzlfidikzkomaywqwku.supabase.co

VITE_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqemxmaWRpa3prb21heXdxd2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MjI2NDYsImV4cCI6MjA4NDE5ODY0Nn0.Yu04bAA3qz2DSPR7bfnyLLZuTaeBAz1rDL2qDUqcOOU
```

6. **Click:** "Deploy site"

### 3️⃣ You're Live! 🎉

Your site will be at: `https://random-name.netlify.app`

**Change the name:**
- Site settings → Domain management → Edit site name
- Change to: `triple-waza-challenge`
- New URL: `https://triple-waza-challenge.netlify.app`

---

## 💰 Cost: $0/month

- 100GB bandwidth (free)
- Unlimited sites (free)
- HTTPS/SSL (free)
- Custom domain (free)

---

## 🔄 Future Updates

```bash
git add .
git commit -m "Updated feature X"
git push
```

Deploys automatically in 2-3 minutes!

---

## 📖 Full Guide

See `NETLIFY_DEPLOYMENT_GUIDE.md` for detailed instructions and troubleshooting.

## ⚙️ Configuration

Your `netlify.toml` is already configured - no changes needed!
