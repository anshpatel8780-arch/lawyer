# Deployment Guide

## Quick Start Deployment Checklist

- [ ] Configure GitHub repository settings for Pages
- [ ] Set up environment variables on Heroku
- [ ] Verify MongoDB connection
- [ ] Test Stripe API keys
- [ ] Push to GitHub (triggers automatic deployments)

---

## Frontend Deployment (GitHub Pages)

### Automatic Deployment (Recommended)

The project includes GitHub Actions workflow that automatically deploys the frontend to GitHub Pages.

**How it works:**
1. On push to `main` or `master` branch
2. GitHub Actions builds the frontend (`npm run build`)
3. Builds are deployed to GitHub Pages automatically
4. Frontend is accessible at: `https://anshpatel8780-arch.github.io/lawyer`

**Manual rebuild trigger:**
- Push any changes to the repository
- GitHub Actions will automatically start the workflow
- Monitor progress in **Actions** tab on GitHub

### Manual GitHub Pages Configuration

If automatic deployment doesn't work:

1. Go to repository **Settings** → **Pages**
2. Under "Source", select:
   - Branch: `main` or `master`
   - Folder: `frontend/dist`
3. Click **Save**
4. Run: `cd frontend && npm run build`
5. Manually commit and push the dist folder

---

## Backend Deployment (Heroku)

### Prerequisites
- Heroku account (https://www.heroku.com)
- Heroku CLI installed (`https://devcenter.heroku.com/articles/heroku-cli`)
- Credit card on file (free tier requires verification)

### Step 1: Initial Setup

```bash
# Login to Heroku
heroku login

# Navigate to project
cd d:\lawyer

# Create Heroku app
heroku create lawyer-backend --region us

# View created app
heroku apps
```

### Step 2: Add Environment Variables

```bash
# Set environment variables (replace with your actual values)
heroku config:set `
  MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/dbname" `
  JWT_SECRET="your_super_secret_jwt_key_here" `
  NODE_ENV="production" `
  CLIENT_URL="https://anshpatel8780-arch.github.io/lawyer" `
  STRIPE_SECRET_KEY="sk_live_your_stripe_key" `
  STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret" `
  SMTP_USER="your-email@gmail.com" `
  SMTP_PASSWORD="your-app-password"

# Verify variables
heroku config
```

### Step 3: Deploy to Heroku

```bash
# Deploy code
git push heroku main

# Or if your main branch is 'master'
git push heroku master

# Monitor deployment
heroku logs --tail
```

### Step 4: Update Frontend API URL

For production, update the frontend's API base URL:

**Frontend environment variable (.env.production):**
```
VITE_API_URL=https://lawyer-backend.herokuapp.com
```

Or update in code:
```javascript
// src/api/axios.js
const API_URL = process.env.VITE_API_URL || (
  window.location.hostname === 'anshpatel8780-arch.github.io'
    ? 'https://lawyer-backend.herokuapp.com'
    : 'http://localhost:5000'
);
```

### Step 5: Test Deployment

```bash
# Check health endpoint
curl https://lawyer-backend.herokuapp.com/api/health

# View logs in real-time
heroku logs --tail

# Scale dynos if needed
heroku ps:scale web=1
```

---

## Database Setup (MongoDB Atlas)

### Create MongoDB Database

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Login
3. Create a cluster
4. Create database user
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/lawyer`
6. Add connection string to Heroku config

---

## Stripe Payment Setup

### For Production Payments

1. Update to Stripe live keys (not test keys)
2. Set webhook endpoint: `https://lawyer-backend.herokuapp.com/api/stripe/webhook`
3. Update `STRIPE_WEBHOOK_SECRET` in Heroku config

### Testing Payments (Development)

Use Stripe test card numbers:
- **Visa:** `4242 4242 4242 4242`
- **Declining:** `4000 0000 0000 0002`

---

## Troubleshooting

### Frontend deployment not working
```bash
# Check if dist folder is built correctly
cd frontend
npm run build
ls dist/

# Push changes
git add .
git commit -m "Update frontend"
git push origin main
```

### Backend not starting on Heroku
```bash
# Check logs
heroku logs --tail

# Verify Procfile exists
cat Procfile  # Should output: web: node backend/server.js

# Check buildpacks
heroku buildpacks
```

### MongoDB connection error
```bash
# Test connection string locally
# Update MONGODB_URI in .env and test locally first
npm run dev

# Then apply to Heroku
heroku config:set MONGODB_URI="..."
git push heroku main
```

### CORS errors in production
Make sure `CLIENT_URL` environment variable on Heroku matches your GitHub Pages URL:
```bash
heroku config:set CLIENT_URL="https://anshpatel8780-arch.github.io/lawyer"
```

### Socket.io connection issues
Update Socket.io CORS settings in `backend/server.js`:
```javascript
const io = new Server(server, {
    cors: { 
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true 
    }
});
```

---

## Deployment Status Dashboard

### GitHub Pages Status
- Repository: https://github.com/anshpatel8780-arch/lawyer
- Actions: https://github.com/anshpatel8780-arch/lawyer/actions
- Live Site: https://anshpatel8780-arch.github.io/lawyer

### Heroku Status
- Dashboard: https://dashboard.heroku.com
- Logs: `heroku logs --tail`
- Metrics: `heroku metrics`

---

## Post-Deployment Steps

1. ✅ Test authentication
2. ✅ Verify API endpoints respond
3. ✅ Test real-time chat via Socket.io
4. ✅ Test payment processing
5. ✅ Monitor error logs
6. ✅ Set up monitoring/alerts
7. ✅ Configure custom domain (optional)

---

## Performance Optimization

### Frontend
- Image optimization in Vite build
- Code splitting and lazy loading
- CDN delivery via GitHub Pages

### Backend
- Database indexing on frequently queried fields
- API rate limiting to prevent abuse
- Enable gzip compression

```bash
# Enable compression on Heroku
heroku config:set NODE_ENV=production
```

---

## Monitoring

### Enable Heroku Monitoring
```bash
heroku addons:create newrelic:wayne
```

### View Application Logs
```bash
# Real-time logs
heroku logs --tail

# Last 100 lines
heroku logs -n 100

# Filter by log source
heroku logs --source app
```

---

## Updating Deployment

After making changes:

```bash
# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub (triggers frontend deployment)
git push origin main

# Push to Heroku (deploys backend)
git push heroku main

# Or do both simultaneously
git push origin main && git push heroku main
```

---

**Need Help?** Check the main README.md or create an issue on GitHub.
