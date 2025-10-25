# Vercel Deployment Guide

## Quick Deployment Steps

### 1. Connect to GitHub
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select "Import Git Repository"
4. Authorize Vercel to access your GitHub
5. Select your repository: `iamodlj/Portfolio`

### 2. Configure Project Settings
Vercel will auto-detect these settings:
- **Framework Preset**: Vite
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Add Environment Variables
⚠️ **CRITICAL**: Before deploying, add these in Vercel Project Settings → Environment Variables:

```env
SMTP_HOST=server242.web-hosting.com
SMTP_USER=your-smtp-user@example.com
SMTP_PASS=your-smtp-password
RECIPIENT_EMAIL=techwiththefather@gmail.com
FROM_EMAIL=service@kamakgroup.com
```

**To add variables:**
1. Go to your project on Vercel
2. Click "Settings" → "Environment Variables"
3. Add each variable (click "Add Another" for multiple)
4. Select "Production", "Preview", and "Development" environments
5. Click "Save"

### 4. Deploy
1. Click "Deploy" button
2. Wait for build to complete (~30 seconds)
3. Your site will be live at: `https://your-project.vercel.app`

## Post-Deployment Checklist

### ✅ Verify Deployment
- [ ] Site loads without errors
- [ ] No console errors in browser DevTools
- [ ] Contact form sends emails successfully
- [ ] Toast notifications appear correctly
- [ ] Loading states work on contact form
- [ ] No MIME type errors in console

### ✅ Test Production Features
- [ ] Error boundary works (try triggering an error)
- [ ] All links work correctly
- [ ] Images load properly
- [ ] Responsive design works on mobile
- [ ] Navigation scrolls correctly

## Troubleshooting

### Build Fails
```bash
# Check build logs in Vercel dashboard
# Common issues:
- Missing dependencies
- TypeScript errors
- Environment variables not set
```

### Contact Form Not Working
```bash
# Verify environment variables are set
# Check Vercel logs for API errors
# Test API endpoint directly
```

### MIME Type Errors
```bash
# Already fixed in vercel.json
# If still occurring, verify build output
```

## Continuous Deployment

### Automatic Deployments
- Every push to `main` branch → Production deployment
- Every PR → Preview deployment
- Manual deployments available in dashboard

### Custom Domain
1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate auto-generated

## Monitoring

### Vercel Analytics
- Automatically enabled
- View in Vercel dashboard
- Track page views, visits, etc.

### Logs
- Function logs in Vercel dashboard
- View API route logs
- Check for errors

## Rollback
If deployment fails:
1. Go to "Deployments" tab
2. Find last working deployment
3. Click "..." → "Promote to Production"

## Performance

### Optimizations Enabled
- ✅ Edge caching
- ✅ CDN distribution
- ✅ Gzip compression
- ✅ Automatic code splitting
- ✅ Image optimization

### Check Performance
- Run Lighthouse in Chrome DevTools
- Aim for 90+ scores

## Security

### Environment Variables
- Never commit `.env` files
- Use Vercel's environment variables
- Keep sensitive data secure

### API Routes
- Contact API protected with CORS
- Only allows whitelisted origins
- Secure SMTP credentials

## Need Help?

Check these resources:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- Project README.md

## Deploy Now!

🚀 Ready to deploy? Follow steps above and your portfolio will be live in minutes!
