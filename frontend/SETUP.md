# Pouranik Frontend Setup Guide

## Prerequisites

- **Node.js**: Version 18.0.0 or higher (recommended: v20.x.x)
- **npm**: Version 8.0.0 or higher

## Quick Start

1. **Clone the repository and navigate to frontend**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   - Copy the `.env.example` to `.env` (if available)
   - Or create a `.env` file with:

   ```
   VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key_here
   VITE_BACKEND_URL=http://localhost:3000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## Common Issues & Solutions

### 1. TypeError: crypto.hash is not a function

**Cause**: Node.js version compatibility or crypto API usage in browser environment.

**Solutions**:

#### Option A: Update Node.js (Recommended)

```bash
# Install Node.js v20.x.x or higher
# Download from: https://nodejs.org/
```

#### Option B: Use Node Version Manager

```bash
# Using nvm (Linux/Mac)
nvm install 20
nvm use 20

# Using nvm-windows (Windows)
nvm install 20.19.1
nvm use 20.19.1
```

#### Option C: Clear cache and reinstall

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### 2. Port already in use

**Error**: `Port 5173 is already in use`

**Solution**:

```bash
# Kill process using the port
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3001
```

### 3. Module resolution errors

**Error**: Cannot resolve module 'xyz'

**Solution**:

```bash
# Clear Vite cache
npx vite --force

# Or clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 4. Build errors

**Error**: Build fails with various errors

**Solutions**:

```bash
# Check for type errors
npm run lint

# Try building with verbose output
npm run build -- --mode development

# Clear cache and rebuild
rm -rf dist node_modules package-lock.json
npm install
npm run build
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
# Google Books API Key (required for book search)
VITE_GOOGLE_BOOKS_API_KEY=your_api_key_here

# Backend URL (if using a backend service)
VITE_BACKEND_URL=http://localhost:3000

# Optional: Custom port
VITE_PORT=5173
```

## Getting Google Books API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Books API"
4. Create credentials (API Key)
5. Copy the API key to your `.env` file

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
frontend/
├── public/           # Static assets
├── src/
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── context/      # React context
│   ├── routes/       # Route definitions
│   ├── App.jsx       # Main app component
│   └── main.jsx      # Entry point
├── .env              # Environment variables
└── package.json      # Dependencies and scripts
```

## Troubleshooting Tips

1. **Always use the correct Node.js version** (18+ recommended)
2. **Clear cache** when experiencing strange errors
3. **Check console logs** in browser developer tools
4. **Restart the dev server** after making configuration changes
5. **Update dependencies** if you encounter compatibility issues

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Getting Help

If you continue to experience issues:

1. Check the browser console for detailed error messages
2. Ensure all environment variables are set correctly
3. Try running the app in incognito/private mode
4. Check if your antivirus is blocking the development server

For additional support, please check the project documentation or create an issue.
