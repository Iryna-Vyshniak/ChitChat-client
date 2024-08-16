import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './App';
import { AuthContextProvider } from './shared/context/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
