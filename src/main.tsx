import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import './index.css'

// Global error handler for script errors
window.addEventListener('error', (event) => {
  // Handle external script loading errors gracefully
  if (event.filename && (
    event.filename.includes('botpress') ||
    event.filename.includes('cdn.') ||
    event.filename.includes('external') ||
    event.filename.includes('viacep') ||
    event.filename.includes('supabase.co')
  )) {
    console.warn('External script error detected, but application will continue to function:', event.filename);
    event.preventDefault();
    return;
  }

  // Handle generic script errors that might come from cross-origin sources
  if ((event.message === 'Script error.' && !event.filename) ||
      event.message.includes('Script error') ||
      event.message === '') {
    console.warn('Generic/cross-origin script error detected, ignoring to prevent app crash');
    event.preventDefault();
    return;
  }

  // Handle fetch/network related errors
  if (event.error && (
    event.error.name === 'TypeError' && event.error.message.includes('fetch') ||
    event.error.name === 'NetworkError' ||
    event.error.name === 'AbortError'
  )) {
    console.warn('Network/fetch error detected, ignoring:', event.error.message);
    event.preventDefault();
    return;
  }

  // Log other errors for debugging but don't prevent them
  console.error('Script error:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.warn('Unhandled promise rejection:', event.reason);

  // Don't prevent default for critical promise rejections
  if (event.reason && typeof event.reason === 'object' && event.reason.name === 'AbortError') {
    // These are usually harmless fetch cancellations
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
