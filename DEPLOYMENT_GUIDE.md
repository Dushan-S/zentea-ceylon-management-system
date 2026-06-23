# Vercel Deployment Guide for MERN Stack Project

## Pre-Deployment Checklist

### 1. Environment Variables
Set up the following environment variables in your Vercel project dashboard:

#### Frontend Variables
- `VITE_API_URL` - Your backend API URL (e.g., `https://yourdomain.com/api`)
- `VITE_WEATHER_API_KEY` - Your OpenWeatherMap API key

#### Backend Variables
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Backend port (default: 5001)
- Any other backend-specific environment variables from `backend/.env`

### 2. Project Structure
```
.
├── backend/          # Node.js Express backend
├── frontend/         # React Vite frontend
├── vercel.json       # Vercel configuration
└── .vercelignore     # Files to ignore during deployment
```

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables
6. Deploy!

## Build Configuration

The `vite.config.js` has been optimized for production builds with:

- **Node.js Module Polyfills**: All Node.js built-in modules are stubbed for browser compatibility
- **Code Splitting**: Manual chunks for better performance
  - `react-vendor`: React core libraries
  - `chart-vendor`: Chart.js and related libraries
  - `pdf-vendor`: jsPDF and PDF generation libraries
  - `ui-vendor`: UI component libraries
- **Global Definitions**: `process.env` and `global` defined for library compatibility

## Common Issues & Solutions

### Issue 1: "Module 'fs' not found" or similar Node.js module errors
**Solution**: Already fixed in `vite.config.js` - all Node.js modules are aliased to `false`

### Issue 2: Build fails with "Cannot find module"
**Solution**: Ensure all dependencies are in `package.json` and run:
```bash
cd frontend && npm install
cd ../backend && npm install
```

### Issue 3: API calls fail after deployment
**Solution**: 
- Check that `VITE_API_URL` environment variable is set correctly in Vercel
- Ensure backend is deployed and accessible
- Update CORS settings in backend to allow your Vercel domain

### Issue 4: Large bundle size warnings
**Solution**: Already optimized with code splitting. To further improve:
- Use dynamic imports for large components
- Lazy load routes with React.lazy()

## Performance Optimizations Applied

1. ✅ Manual code splitting for vendor chunks
2. ✅ Node.js polyfills removed/stubbed
3. ✅ ES Module optimization enabled
4. ✅ Source maps disabled for production
5. ✅ Minification with esbuild

## Vercel Configuration

The `vercel.json` file configures:
- Frontend build from `/frontend` directory
- Backend API routes at `/api/*`
- Static file serving for frontend
- Production environment variables

## Testing Before Deployment

1. **Test production build locally**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

2. **Test backend locally**
   ```bash
   cd backend
   npm start
   ```

3. **Check environment variables**
   - Verify all required variables are in `.env` files
   - Never commit `.env` files to git

## Post-Deployment

1. Verify frontend loads correctly
2. Test API endpoints
3. Check browser console for errors
4. Test all major features
5. Monitor Vercel logs for errors

## Support

For issues specific to:
- **Vite**: https://vitejs.dev/guide/
- **Vercel**: https://vercel.com/docs
- **React**: https://react.dev/

## Build Logs

If deployment fails, check:
1. Vercel deployment logs in dashboard
2. Build errors in the logs
3. Environment variables are set correctly
4. All dependencies are listed in package.json
