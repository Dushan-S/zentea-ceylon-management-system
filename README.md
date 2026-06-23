# ZenTea Ceylon Management System

## Overview

ZenTea Ceylon Management System is a MERN Stack based tea estate and tea business management platform developed as a university group project.

The system provides centralized management for:

- User Management
- Inventory Management
- Cultivation Management
- Order Management
- Salary Management
- Report Generation

## Technologies

Frontend:
- React.js
- JavaScript
- CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB

Authentication:
- JWT Authentication

## Main Features

### User Management
- Customer registration
- Employee management
- Supplier management
- Role based access control

### Inventory Management
- Product management
- Stock monitoring
- Restock tracking
- Inventory reports

### Cultivation Management
- Plot management
- Crop management
- Weather monitoring
- Cultivation reports

### Order Management
- Order processing
- Order tracking
- Sales analytics

### Salary Management
- Payroll generation
- Payslip generation
- Salary reports

## Academic Information

Sri Lanka Institute of Information Technology (SLIIT)

Bachelor of Science (Hons) in Information Technology

Specialization in Information Technology

## Team Member

Dushan Attanayake,
Dilshan Dilushawannige,
Ravindu Thathsara,
Minidu Lochana,
Danupa Thamode

## Status

Completed Academic Group Project

---

## Deployment to Vercel

### Quick Deploy (3 Steps)

#### 1. Set Environment Variables in Vercel Dashboard

**Frontend:**
```
VITE_API_URL=https://your-backend-url.vercel.app
VITE_WEATHER_API_KEY=your_openweather_api_key
```

**Backend:**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5001
NODE_ENV=production
```

#### 2. Deploy

**Option A: Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Option B: GitHub Integration**
1. Push code to GitHub
2. Go to https://vercel.com/dashboard
3. Import repository
4. Configure environment variables
5. Deploy!

#### 3. Verify
- Test frontend loads correctly
- Test API endpoints (/api/*)
- Check authentication works
- Monitor Vercel logs

---

## Local Development

### Install Dependencies
```bash
# Install all
npm run install:all

# Or individually
cd frontend && npm install
cd backend && npm install
```

### Run Development Servers

**Frontend:**
```bash
cd frontend
npm run dev
```
Runs on: http://localhost:5173

**Backend:**
```bash
cd backend
npm run dev
```
Runs on: http://localhost:5001

### Build for Production
```bash
cd frontend
npm run build
```

---

## Project Structure

```
├── backend/              # Node.js Express API
│   ├── config/           # Configuration
│   ├── middleware/       # Auth & validation
│   ├── models/           # MongoDB models
│   ├── modules/          # Feature modules
│   └── server.js         # Entry point
├── frontend/             # React Vite App
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   └── vite.config.js    # Build config
├── vercel.json           # Vercel configuration
└── .vercelignore         # Deployment exclusions
```

---

## Environment Files

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001
VITE_WEATHER_API_KEY=your_api_key
```

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/zentea
JWT_SECRET=your_secret_key
PORT=5001
NODE_ENV=development
```

---

## Important Notes

- ✅ Node.js polyfills configured for browser compatibility
- ✅ Code splitting enabled for optimized loading
- ✅ Separate builds for frontend and backend
- ✅ All dependencies properly installed
- ✅ Production build tested and working

---

## Support

For Vercel deployment help: https://vercel.com/docs
