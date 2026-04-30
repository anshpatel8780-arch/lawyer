# FINAL DEPLOYMENT STEPS

Your code has been successfully pushed to GitHub! 🎉

Complete these steps to make your application live:

## Step 1: Enable GitHub Pages

1. Go to: https://github.com/anshpatel8780-arch/lawyer/settings
2. Scroll to "Pages" section on the left sidebar
3. Under "Source", select:
   - Branch: `main`
   - Folder: `/(root)` 
4. Click **Save**
5. GitHub Actions will automatically build and deploy within 1-2 minutes
6. Your site will be live at: **https://anshpatel8780-arch.github.io/lawyer**

**Verify deployment:**
- Check the "Actions" tab: https://github.com/anshpatel8780-arch/lawyer/actions
- Wait for the workflow "Deploy Frontend to GitHub Pages" to complete (green checkmark)

---

## Step 2: Deploy Backend to Heroku

### Option A: Command Line (Recommended)

```powershell
# 1. Install Heroku CLI if not already installed
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# 2. Open PowerShell and navigate to project
cd d:\lawyer

# 3. Login to Heroku
heroku login

# 4. Create Heroku app
heroku create lawyer-backend

# 5. Add your MongoDB connection string
heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/lawyer"

# 6. Add other required environment variables
heroku config:set JWT_SECRET="your_jwt_secret_key_here"
heroku config:set STRIPE_SECRET_KEY="sk_live_your_stripe_secret_key"
heroku config:set STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
heroku config:set CLIENT_URL="https://anshpatel8780-arch.github.io/lawyer"
heroku config:set SMTP_USER="your-email@gmail.com"
heroku config:set SMTP_PASSWORD="your-email-password"
heroku config:set NODE_ENV="production"

# 7. Deploy your code
git push heroku main

# 8. View logs to verify deployment
heroku logs --tail
```

### Option B: Heroku Dashboard (Manual)

1. Go to: https://dashboard.heroku.com
2. Click "New" → "Create new app"
3. Name: `lawyer-backend`
4. Region: `United States`
5. Click "Create app"
6. Go to "Settings" tab
7. Add "Config Vars" (environment variables):
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Generate a secure random string
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
   - `CLIENT_URL`: `https://anshpatel8780-arch.github.io/lawyer`
   - `SMTP_USER`: Your email
   - `SMTP_PASSWORD`: Your email password
   - `NODE_ENV`: `production`
8. Go to "Deploy" tab
9. Connect to GitHub repository: `anshpatel8780-arch/lawyer`
10. Deploy branch: `main`
11. Enable "Automatic deploys"
12. Click "Deploy Branch"

---

## Step 3: Verify Everything Works

### Test Frontend
```
1. Visit: https://anshpatel8780-arch.github.io/lawyer
2. Check that the page loads and 3D hero displays
3. Try navigating between pages
```

### Test Backend
```powershell
# Test health endpoint
curl https://lawyer-backend.herokuapp.com/api/health

# Expected response:
# {"status":"OK","env":"production"}
```

### Test Connection
```powershell
# Test API from frontend by trying to login/sign up
# Should see network requests to https://lawyer-backend.herokuapp.com/api/*
```

---

## Step 4: Get MongoDB Atlas Connection String

If you need to set up MongoDB:

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up or login
3. Create a cluster
4. Click "Connect"
5. Choose connection method: "Connect your application"
6. Select Node.js driver
7. Copy the connection string
8. Replace `<password>` and `<username>` with your database user credentials
9. Use this string as your `MONGODB_URI` on Heroku

**Example format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/lawyer?retryWrites=true&w=majority
```

---

## Step 5: Get Stripe Keys

For payment processing:

1. Go to: https://dashboard.stripe.com
2. Sign up or login
3. In left sidebar, go to "API keys"
4. Copy:
   - `STRIPE_SECRET_KEY` (starts with `sk_test_` or `sk_live_`)
   - For webhooks, go to "Webhooks" section
   - Create webhook for endpoint: `https://lawyer-backend.herokuapp.com/api/stripe/webhook`
   - Copy the webhook secret as `STRIPE_WEBHOOK_SECRET`

---

## Your Live Application URLs

Once deployed:

| Component | URL |
|-----------|-----|
| **Frontend (GitHub Pages)** | https://anshpatel8780-arch.github.io/lawyer |
| **Backend API (Heroku)** | https://lawyer-backend.herokuapp.com |
| **API Health Check** | https://lawyer-backend.herokuapp.com/api/health |
| **GitHub Repository** | https://github.com/anshpatel8780-arch/lawyer |

---

## File Structure Created for Deployment

```
lawyer/
├── .github/
│   └── workflows/
│       └── deploy-frontend.yml          # GitHub Actions workflow
├── Procfile                              # Heroku process definition
├── .gitignore                            # Git ignore rules
├── README.md                             # Project documentation
└── DEPLOYMENT.md                         # Detailed deployment guide
```

---

## Troubleshooting

### GitHub Pages not deploying
- Check Actions tab for errors: https://github.com/anshpatel8780-arch/lawyer/actions
- Ensure Pages settings point to `main` branch and `/(root)` folder
- Try: Settings → Pages → refresh the page

### Heroku deployment failing
```powershell
# Check logs
heroku logs --tail

# Common issues:
# 1. MONGODB_URI not set: Add it with heroku config:set
# 2. Missing dependencies: Check backend/package.json has all required packages
# 3. PORT not set: Procfile should have: web: node backend/server.js
```

### Frontend can't connect to backend
- Verify backend is running: Check `https://lawyer-backend.herokuapp.com/api/health`
- Check CORS settings: Backend should allow GitHub Pages URL
- Update `CLIENT_URL` on Heroku to: `https://anshpatel8780-arch.github.io/lawyer`

### Socket.io not connecting
- Ensure backend is deployed on Heroku
- Check WebSocket is enabled (usually automatic on Heroku)
- Verify `CLIENT_URL` matches frontend URL in Heroku config

---

## Next Steps (Post-Deployment)

- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS certificate (automatic for GitHub Pages & Heroku)
- [ ] Set up monitoring/alerting
- [ ] Configure automatic backups for MongoDB
- [ ] Set up CI/CD testing before deploy
- [ ] Add analytics to frontend
- [ ] Configure error tracking (e.g., Sentry)

---

## Support Resources

- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Heroku Docs:** https://devcenter.heroku.com
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Stripe Docs:** https://stripe.com/docs

---

**Questions?** Open an issue on GitHub: https://github.com/anshpatel8780-arch/lawyer/issues

---

*Generated on: March 24, 2026*
