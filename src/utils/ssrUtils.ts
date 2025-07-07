
import React from 'react';

// Simulate ReactDOMServer.renderToString() functionality
export const simulateServerRender = (): string => {
  // This simulates what ReactDOMServer.renderToString() would generate
  // In a real implementation, you'd import ReactDOMServer and use:
  // import { renderToString } from 'react-dom/server';
  // return renderToString(React.createElement(SharedComponent));
  
  const serverRenderedHTML = `
<div class="w-full max-w-md mx-auto rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
  <div class="flex flex-col space-y-1.5 p-6" data-v0-t="card-header">
    <div class="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2" data-v0-t="card-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up w-5 h-5 text-blue-500">
        <path d="M7 10v12"></path>
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h3.73a2 2 0 0 1 1.92 2.56Z"></path>
      </svg>
      Interactive Post Component
    </div>
  </div>
  <div class="p-6 pt-0 space-y-4" data-v0-t="card-content">
    <div class="text-gray-600">
      This component demonstrates SSR and hydration. It renders the same way on 
      the server and client, but only becomes interactive after hydration.
    </div>
    <div class="flex gap-3">
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart w-4 h-4">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"></path>
        </svg>
        42
      </button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-4 h-4">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
        </svg>
        128
      </button>
    </div>
    <div class="text-xs text-gray-500 bg-gray-50 p-2 rounded">
      Current timestamp: ${new Date().toLocaleTimeString()}
    </div>
  </div>
</div>`.trim();

  return serverRenderedHTML;
};

// Simulate the hydration process
export const simulateHydration = (element: HTMLElement, component: React.ReactElement) => {
  console.log('🔄 Starting hydration process...');
  console.log('📄 Server HTML:', element.innerHTML);
  console.log('⚛️ React Component:', component);
  console.log('💧 Hydration complete - React has taken over!');
};

// Utility to compare server and client rendered content
export const validateHydration = (serverHTML: string, clientHTML: string): boolean => {
  // In a real app, React would do this validation automatically
  // and warn about mismatches in development mode
  const normalizeHTML = (html: string) => {
    return html.replace(/\s+/g, ' ').trim();
  };
  
  const isMatch = normalizeHTML(serverHTML) === normalizeHTML(clientHTML);
  
  if (!isMatch) {
    console.warn('⚠️ Hydration mismatch detected!');
    console.log('Server HTML:', normalizeHTML(serverHTML));
    console.log('Client HTML:', normalizeHTML(clientHTML));
  } else {
    console.log('✅ Hydration validation passed!');
  }
  
  return isMatch;
};
