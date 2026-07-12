# Deploy to Vercel
# Prerequisites: npm i -g vercel, vercel login

Write-Host "=== Deploying Hotel CEMAR to Vercel ===" -ForegroundColor Green

# 1. Install dependencies
Write-Host "`n[1/3] Installing dependencies..." -ForegroundColor Yellow
npm install

# 2. Set environment variables
Write-Host "`n[2/3] Setting environment variables..." -ForegroundColor Yellow
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add PAYPAL_CLIENT_ID
vercel env add PAYPAL_CLIENT_SECRET
vercel env add SITE_URL

# 3. Deploy
Write-Host "`n[3/3] Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "`n=== Done! ===" -ForegroundColor Green
