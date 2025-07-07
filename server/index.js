
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const app = express();
const PORT = 3001;

// كومبوننت واحد بسيط جداً
const SimpleComponent = React.createElement('div', {
  style: { 
    textAlign: 'center', 
    marginTop: '100px',
    fontFamily: 'Arial'
  }
}, [
  React.createElement('h1', { key: 'title' }, 'مرحباً من السيرفر! 🚀'),
  React.createElement('p', { key: 'text' }, 'هذا كومبوننت بسيط جداً من الباك إند'),
  React.createElement('button', { 
    key: 'btn',
    id: 'simple-btn',
    style: { 
      padding: '10px 20px', 
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px'
    }
  }, 'اضغط هنا')
]);

app.get('/', (req, res) => {
  // رندر الكومبوننت في السيرفر
  const html = ReactDOMServer.renderToString(SimpleComponent);
  
  // إرسال HTML كامل
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>كومبوننت بسيط SSR</title>
    </head>
    <body>
        <div id="root">${html}</div>
        
        <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        
        <script>
            // نفس الكومبوننت مع الـ event
            const ClientComponent = React.createElement('div', {
                style: { 
                    textAlign: 'center', 
                    marginTop: '100px',
                    fontFamily: 'Arial'
                }
            }, [
                React.createElement('h1', { key: 'title' }, 'مرحباً من السيرفر! 🚀'),
                React.createElement('p', { key: 'text' }, 'هذا كومبوننت بسيط جداً من الباك إند'),
                React.createElement('button', { 
                    key: 'btn',
                    id: 'simple-btn',
                    style: { 
                        padding: '10px 20px', 
                        fontSize: '16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px'
                    },
                    onClick: () => alert('الزر يشتغل! ✅')
                }, 'اضغط هنا')
            ]);
            
            ReactDOM.hydrateRoot(document.getElementById('root'), ClientComponent);
        </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log('السيرفر يعمل على البورت', PORT);
  console.log('زيارة: http://localhost:' + PORT);
});
