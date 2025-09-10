# Google Books API Key Setup Guide

## Current Issue
The Google Books API key in your `.env` file is valid but the Books API is not enabled for the associated Google Cloud project.

**Error Message:**
```
Books API has not been used in project 248062566120 before or it is disabled
```

## Solution Steps

### Option 1: Enable the API for Current Project (Recommended)

1. **Visit the Google Cloud Console:**
   - Go to: https://console.developers.google.com/apis/api/books.googleapis.com/overview?project=248062566120
   - Or manually navigate to [Google Cloud Console](https://console.cloud.google.com/)

2. **Enable the Books API:**
   - Click on "Enable API" button
   - Wait for the API to be activated (may take a few minutes)

3. **Verify the API Key:**
   - Go to [API Credentials](https://console.cloud.google.com/apis/credentials)
   - Make sure your API key has the correct restrictions (if any)

### Option 2: Create a New API Key

If you don't have access to the current project, create a new one:

1. **Create a New Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Click on project dropdown → "New Project"
   - Enter project name and click "Create"

2. **Enable Books API:**
   - In the new project, go to "APIs & Services" → "Library"
   - Search for "Books API"
   - Click on it and press "Enable"

3. **Create API Key:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the new API key

4. **Update your .env file:**
   ```properties
   VITE_GOOGLE_BOOKS_API_KEY=your_new_api_key_here
   ```

## Testing the Fix

After enabling the API, test it with this command:
```bash
curl "https://www.googleapis.com/books/v1/volumes?q=test&maxResults=1&key=YOUR_API_KEY"
```

## For Development (Temporary Solution)

The Google Books API works without an API key for basic testing, but with limited quota. You can temporarily modify the `bookService.js` to work without an API key:

```javascript
// In bookService.js, modify the URL construction:
const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&startIndex=${startIndex}&maxResults=${maxResults}`;
// Remove: &key=${apiKey}
```

**Note:** This is only for development testing. For production, you should use a proper API key.

## Security Best Practices

1. **Restrict your API key:**
   - Add HTTP referrer restrictions
   - Limit to specific APIs (Books API only)
   - Consider IP restrictions if needed

2. **Environment Variables:**
   - Never commit API keys to version control
   - Use `.env` files for local development
   - Use environment variables in production

## Current Status
- ✅ **API Key is working properly** - Books API enabled successfully
- ✅ **Google Books API service is operational**
- ✅ **Application code is correctly implemented**
- ✅ **Sorting and filtering parameters working**
- ✅ **Ready for full functionality testing**

## Verification Complete
The API key has been tested successfully with the following parameters:
- Basic search: ✅ Working
- Sorting (orderBy=newest): ✅ Working  
- Content type filtering (printType=books): ✅ Working
- Combined parameters: ✅ Working

Your application should now be fully functional!
