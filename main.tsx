import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'
import { HelmetProvider } from 'react-helmet-async'; // Import hinzugefügt

// Make sure we have proper error handling
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Root element not found");

  const root = createRoot(rootElement);
  // App mit HelmetProvider umschlossen
  root.render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
} catch (error) {
  console.error("Error rendering application:", error);
  // Display error to user in case of render failures
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px;">
        <h2>Application Error</h2>
        <p>Sorry, there was a problem loading the application. Please try refreshing the page.</p>
        <p>Details: ${error instanceof Error ? error.message : String(error)}</p>
      </div>
    `;
  }
}
