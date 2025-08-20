import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import './index.css'

// Global error handler for script errors
window.addEventListener('error', (event) => {
  // Handle script loading errors gracefully
  if (event.filename && event.filename.includes('botpress')) {
    console.warn('Botpress script error detected, but application will continue to function');
    event.preventDefault();
    return;
  }

  // Log other errors for debugging
  console.error('Script error:', event.error || event.message);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.warn('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
