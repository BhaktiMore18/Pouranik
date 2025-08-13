import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react'; // Import ClerkProvider
import './index.css';
import App from './App.jsx';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY; // Or your environment variable

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
