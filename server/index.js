
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files
app.use('/static', express.static(path.resolve(__dirname, '../dist')));

// Import your React components (you'd need to transpile them for Node.js)
// For this example, we'll create a simple component server-side
const ServerApp = React.createElement('div', {
  className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'
}, [
  React.createElement('div', {
    key: 'container',
    className: 'container mx-auto px-4 py-8'
  }, [
    React.createElement('h1', {
      key: 'title',
      className: 'text-4xl font-bold text-gray-800 mb-4 text-center'
    }, 'React SSR Application'),
    React.createElement('div', {
      key: 'content',
      className: 'max-w-md mx-auto bg-white rounded-lg shadow-md p-6'
    }, [
      React.createElement('h2', {
        key: 'subtitle',
        className: 'text-xl font-semibold mb-4'
      }, 'Server-Rendered Content'),
      React.createElement('p', {
        key: 'description',
        className: 'text-gray-600 mb-4'
      }, 'This content was rendered on the server using ReactDOMServer.renderToString()'),
      React.createElement('button', {
        key: 'button',
        id: 'interactive-button',
        className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      }, 'Click me (will work after hydration)')
    ])
  ])
]);

// HTML template
const getHTMLTemplate = (reactHTML) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React SSR App</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            /* Add any critical CSS here */
        </style>
    </head>
    <body>
        <div id="root">${reactHTML}</div>
        
        <!-- Client-side React bundle -->
        <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        
        <!-- Your client-side app -->
        <script>
            // This would normally be your bundled client app
            console.log('🚀 Starting client-side hydration...');
            
            // Simulate hydration
            const root = ReactDOM.hydrateRoot(
                document.getElementById('root'),
                React.createElement('div', {
                    className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'
                }, [
                    React.createElement('div', {
                        key: 'container',
                        className: 'container mx-auto px-4 py-8'
                    }, [
                        React.createElement('h1', {
                            key: 'title',
                            className: 'text-4xl font-bold text-gray-800 mb-4 text-center'
                        }, 'React SSR Application'),
                        React.createElement('div', {
                            key: 'content',
                            className: 'max-w-md mx-auto bg-white rounded-lg shadow-md p-6'
                        }, [
                            React.createElement('h2', {
                                key: 'subtitle',
                                className: 'text-xl font-semibold mb-4'
                            }, 'Server-Rendered Content'),
                            React.createElement('p', {
                                key: 'description',
                                className: 'text-gray-600 mb-4'
                            }, 'This content was rendered on the server using ReactDOMServer.renderToString()'),
                            React.createElement('button', {
                                key: 'button',
                                id: 'interactive-button',
                                className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
                                onClick: () => alert('Button is now interactive after hydration!')
                            }, 'Click me (will work after hydration)')
                        ])
                    ])
                ])
            );
            
            console.log('✅ Hydration complete!');
        </script>
    </body>
    </html>
  `;
};

// Main route
app.get('/', (req, res) => {
  try {
    console.log('🔄 Rendering React component on server...');
    
    // Render React component to string
    const reactHTML = ReactDOMServer.renderToString(ServerApp);
    
    console.log('✅ Server rendering complete');
    console.log('📄 Generated HTML length:', reactHTML.length);
    
    // Send complete HTML with rendered React content
    const fullHTML = getHTMLTemplate(reactHTML);
    res.send(fullHTML);
    
  } catch (error) {
    console.error('❌ Server rendering error:', error);
    res.status(500).send('Server rendering failed');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'React SSR Server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log('🚀 React SSR Server running on port', PORT);
  console.log('📖 Visit http://localhost:' + PORT + ' to see the SSR app');
  console.log('🔍 Health check: http://localhost:' + PORT + '/health');
});

module.exports = app;
