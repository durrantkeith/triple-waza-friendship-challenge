# Deployment Verification Checklist

**Goal**: Get your Triple Waza Challenge site live and accessible

## ✅ Step 1: GitHub Repository Status

**Check**: https://github.com/durrantkeith/triple-waza-friendship-challenge

- [ ] Repository exists and is accessible
- [ ] Latest code is pushed to `main` branch
- [ ] No pending commits locally

**If issues**: Run `git push origin main` to sync

---

## ✅ Step 2: Netlify Connection & Deployment

**Dashboard**: https://app.netlify.com

### A. Verify Site Connection
1. Go to your site in Netlify dashboard
2. Click **Site configuration** → **Build & deploy** → **Continuous deployment**
3. Check:
   - [ ] Repository connected: `durrantkeith/triple-waza-friendship-challenge`
   - [ ] Production branch: `main`
   - [ ] Build command: `npm run build`
   - [ ] Publish directory: `dist`

### B. Check Latest Deploy
1. Go to **Deploys** tab
2. Verify:
   - [ ] Latest deploy shows "Published" (green)
   - [ ] Deploy happened in last 5 minutes
   - [ ] No build errors shown

**If deploy failed**:
- Click into the failed deploy
- Check build logs for errors
- Common fixes:
  - Missing environment variables
  - Build command errors
  - TypeScript errors

### C. Environment Variables
1. Go to **Site configuration** → **Environment variables**
2. Verify these exist:
   - [ ] `VITE_SUPABASE_URL` = `https://zcbbgacxkjfuhcycyaiu.supabase.co`
   - [ ] `VITE_SUPABASE_ANON_KEY` = (your anon key)

**If missing**: Add them from your `.env` file

### D. Trigger Manual Deploy
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait 2-3 minutes
4. Check if status changes to "Published"

---

## ✅ Step 3: Cloudflare Security Settings

**Dashboard**: https://dash.cloudflare.com

### A. Check Security Level
1. Select your domain
2. Go to **Security** → **Settings**
3. Find "Security Level"
4. Change from:
   - ❌ "I'm Under Attack"
   - To: ✅ "Medium" or "Low"

### B. Check WAF Rules
1. Go to **Security** → **WAF**
2. Click **Custom rules**
3. For each rule:
   - [ ] Disable rules that block all traffic
   - [ ] Disable "Managed Challenge" actions
   - [ ] Keep only necessary protection

### C. Check Firewall Rules
1. Go to **Security** → **WAF** → **Firewall rules**
2. Look for rules that might block visitors:
   - [ ] No blanket "Challenge" or "Block" rules
   - [ ] No geographic restrictions (unless intended)

### D. Browser Integrity Check
1. Go to **Security** → **Settings**
2. Find "Browser Integrity Check"
3. Consider: ✅ OFF (for testing) or ON (if needed)

---

## ✅ Step 4: DNS Settings

**Cloudflare Dashboard** → Your Domain → **DNS** → **Records**

### Verify DNS Points to Netlify
Check your DNS records:

**Option A: Subdomain (e.g., challenge.yourdomain.com)**
- [ ] Type: `CNAME`
- [ ] Name: `challenge` (or your subdomain)
- [ ] Target: `YOUR-SITE-NAME.netlify.app`
- [ ] Proxy status: 🟠 Proxied (orange cloud)

**Option B: Root domain (e.g., yourdomain.com)**
- [ ] Type: `A` records pointing to Netlify IPs:
  - `75.2.60.5`
  - `99.83.190.102`
  - `13.224.44.50`
  - `13.225.103.118`
- [ ] OR Type: `CNAME` flattening to `YOUR-SITE-NAME.netlify.app`

---

## ✅ Step 5: Test Live Site

### A. Direct Netlify URL
1. Visit: `https://YOUR-SITE-NAME.netlify.app`
2. Expected: Site loads immediately
3. Check:
   - [ ] No security challenge page
   - [ ] No "Page not found"
   - [ ] Homepage displays correctly

**If this doesn't work**: Issue is with Netlify deployment

### B. Custom Domain
1. Visit: `https://yourdomain.com` (your actual domain)
2. Expected: Site loads immediately
3. Check:
   - [ ] No Cloudflare challenge page
   - [ ] No SSL warnings
   - [ ] Site loads with correct content

**If this doesn't work but Netlify URL does**: Issue is with Cloudflare/DNS

---

## ✅ Step 6: Supabase Connection

Once site loads:

1. Open browser console (F12)
2. Check for errors:
   - [ ] No "Failed to fetch" errors
   - [ ] No Supabase connection errors
3. Test a feature that uses database
4. Verify data loads correctly

---

## 🔧 Quick Fixes

### Issue: Cloudflare Challenge Won't Disable
**Solution**:
1. In Cloudflare, go to **Security** → **Bots**
2. Turn "Bot Fight Mode" to OFF
3. Wait 5 minutes for changes to propagate

### Issue: Site Shows Old Version
**Solution**:
1. Clear Cloudflare cache:
   - Go to **Caching** → **Configuration**
   - Click **Purge Everything**
2. Trigger new Netlify deploy
3. Hard refresh browser (Ctrl+Shift+R)

### Issue: Build Fails on Netlify
**Solution**:
1. Check build logs in Netlify
2. Verify environment variables are set
3. Test build locally: `npm run build`
4. If local build works, ensure all changes are pushed to GitHub

### Issue: DNS Not Resolving
**Solution**:
1. Wait 10-30 minutes for DNS propagation
2. Check DNS with: https://dnschecker.org
3. Verify Cloudflare proxy is enabled (orange cloud)

---

## 📝 Current Status Checklist

Fill this out as you verify each part:

- [ ] GitHub: Code is pushed and up to date
- [ ] Netlify: Connected to GitHub ✅
- [ ] Netlify: Latest deploy successful ✅
- [ ] Netlify: Environment variables set ✅
- [ ] Cloudflare: Security challenge disabled ✅
- [ ] Cloudflare: DNS pointing to Netlify ✅
- [ ] Test: Netlify URL loads ✅
- [ ] Test: Custom domain loads ✅
- [ ] Test: Supabase features work ✅

---

## 🎯 Next Steps

Once all checkboxes are ✅:

1. Test all major features on live site
2. Submit a test video
3. Verify email notifications work
4. Check mobile responsiveness
5. Share link with founding members!

---

**Need Help?** Tell me which step is failing and what error you see.
