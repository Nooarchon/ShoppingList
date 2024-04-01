import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider

// Use createRoot to render your app
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap your App component with the AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
