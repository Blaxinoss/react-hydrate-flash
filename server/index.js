
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files
app.use('/static', express.static(path.resolve(__dirname, '../dist')));

// كومبوننت React بسيط
const WelcomeComponent = React.createElement('div', {
  className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'
}, [
  React.createElement('div', {
    key: 'card',
    className: 'max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center'
  }, [
    React.createElement('h1', {
      key: 'title',
      className: 'text-3xl font-bold text-gray-800 mb-4'
    }, 'مرحباً من السيرفر! 👋'),
    React.createElement('p', {
      key: 'subtitle',
      className: 'text-lg text-blue-600 mb-6'
    }, 'هذا كومبوننت React حقيقي متعمل render في الباك إند'),
    React.createElement('div', {
      key: 'info',
      className: 'bg-green-50 border border-green-200 rounded-lg p-4 mb-6'
    }, [
      React.createElement('h3', {
        key: 'info-title',
        className: 'font-semibold text-green-800 mb-2'
      }, 'معلومات السيرفر:'),
      React.createElement('p', {
        key: 'time',
        className: 'text-green-700 text-sm'
      }, `الوقت: ${new Date().toLocaleString('ar-EG')}`),
      React.createElement('p', {
        key: 'node',
        className: 'text-green-700 text-sm'
      }, `Node.js Version: ${process.version}`)
    ]),
    React.createElement('button', {
      key: 'button',
      id: 'ssr-button',
      className: 'bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold'
    }, 'اضغط هنا (سيعمل بعد الـ hydration)')
  ])
]);

// HTML template
const getHTMLTemplate = (reactHTML) => {
  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React SSR - كومبوننت من الباك إند</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
        </style>
    </head>
    <body>
        <div id="root">${reactHTML}</div>
        
        <!-- React libraries -->
        <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        
        <!-- Client hydration -->
        <script>
            console.log('🚀 بدء الـ hydration...');
            
            // نفس الكومبوننت بس مع إضافة الـ event handlers
            const ClientWelcomeComponent = React.createElement('div', {
                className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'
            }, [
                React.createElement('div', {
                    key: 'card',
                    className: 'max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center'
                }, [
                    React.createElement('h1', {
                        key: 'title',
                        className: 'text-3xl font-bold text-gray-800 mb-4'
                    }, 'مرحباً من السيرفر! 👋'),
                    React.createElement('p', {
                        key: 'subtitle',
                        className: 'text-lg text-blue-600 mb-6'
                    }, 'هذا كومبوننت React حقيقي متعمل render في الباك إند'),
                    React.createElement('div', {
                        key: 'info',
                        className: 'bg-green-50 border border-green-200 rounded-lg p-4 mb-6'
                    }, [
                        React.createElement('h3', {
                            key: 'info-title',
                            className: 'font-semibold text-green-800 mb-2'
                        }, 'معلومات السيرفر:'),
                        React.createElement('p', {
                            key: 'time',
                            className: 'text-green-700 text-sm'
                        }, 'الوقت: ${new Date().toLocaleString('ar-EG')}'),
                        React.createElement('p', {
                            key: 'node',
                            className: 'text-green-700 text-sm'
                        }, 'Node.js Version: ${process.version}')
                    ]),
                    React.createElement('button', {
                        key: 'button',
                        id: 'ssr-button',
                        className: 'bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold',
                        onClick: () => {
                            alert('🎉 الزر يشتغل دلوقتي! الـ hydration تم بنجاح!');
                            console.log('✅ الكومبوننت بقى interactive!');
                        }
                    }, 'اضغط هنا (يشتغل دلوقتي!)')
                ])
            ]);
            
            // Hydrate the component
            const root = ReactDOM.hydrateRoot(
                document.getElementById('root'),
                ClientWelcomeComponent
            );
            
            console.log('✅ الـ hydration تم بنجاح!');
            console.log('🎯 الكومبوننت بقى interactive دلوقتي');
        </script>
    </body>
    </html>
  `;
};

// Main route
app.get('/', (req, res) => {
  try {
    console.log('🔄 بدء render الكومبوننت في السيرفر...');
    
    // Render React component to string
    const reactHTML = ReactDOMServer.renderToString(WelcomeComponent);
    
    console.log('✅ الـ server rendering تم بنجاح');
    console.log('📄 طول الـ HTML المُنتج:', reactHTML.length);
    console.log('🕐 الوقت:', new Date().toLocaleString('ar-EG'));
    
    // Send complete HTML with rendered React content
    const fullHTML = getHTMLTemplate(reactHTML);
    res.send(fullHTML);
    
  } catch (error) {
    console.error('❌ خطأ في الـ server rendering:', error);
    res.status(500).send('فشل في الـ server rendering');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'React SSR Server يعمل بنجاح',
    timestamp: new Date().toLocaleString('ar-EG'),
    component: 'WelcomeComponent rendered successfully'
  });
});

// API endpoint لعرض معلومات الكومبوننت
app.get('/api/component-info', (req, res) => {
  res.json({
    componentName: 'WelcomeComponent',
    renderType: 'Server-Side Rendered',
    nodeVersion: process.version,
    serverTime: new Date().toLocaleString('ar-EG'),
    isSSR: true
  });
});

app.listen(PORT, () => {
  console.log('🚀 React SSR Server يعمل على البورت', PORT);
  console.log('📖 زيارة: http://localhost:' + PORT);
  console.log('🔍 فحص السيرفر: http://localhost:' + PORT + '/health');
  console.log('📊 معلومات الكومبوننت: http://localhost:' + PORT + '/api/component-info');
  console.log('⚛️ الكومبوننت المُستخدم: WelcomeComponent');
});

module.exports = app;
