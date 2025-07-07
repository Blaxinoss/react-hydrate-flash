
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const app = express();
const PORT = 3001;

// كومبوننت واحد بس - كل حاجة في الباك إند
const SimpleComponent = React.createElement('div', {
  style: { 
    textAlign: 'center', 
    marginTop: '100px',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  }
}, [
  React.createElement('h1', { 
    key: 'title',
    style: { color: '#333', marginBottom: '20px' }
  }, 'كل حاجة من الباك إند! 🎉'),
  
  React.createElement('p', { 
    key: 'text',
    style: { color: '#666', marginBottom: '30px', fontSize: '18px' }
  }, 'كومبوننت واحد بس - كله SSR'),
  
  React.createElement('button', { 
    key: 'btn',
    style: { 
      padding: '15px 30px', 
      fontSize: '16px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    }
  }, 'زر بسيط جداً'),
  
  React.createElement('div', {
    key: 'info',
    style: {
      marginTop: '30px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      color: '#495057'
    }
  }, 'ما فيش فرونت إند - كله باك إند!')
]);

app.get('/', (req, res) => {
  // رندر الكومبوننت في السيرفر
  const html = ReactDOMServer.renderToString(SimpleComponent);
  
  // إرسال HTML كامل - بدون أي React في الفرونت إند
  res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>كله باك إند - SSR بس</title>
        <style>
            body { 
                margin: 0; 
                font-family: Arial, sans-serif; 
                background-color: #f0f0f0;
            }
        </style>
    </head>
    <body>
        ${html}
        
        <!-- ما فيش React في الفرونت إند خالص -->
        <script>
            console.log('كل حاجة جاية من الباك إند! ✅');
        </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log('🚀 السيرفر يعمل على البورت', PORT);
  console.log('📁 ما فيش فرونت إند - كله باك إند!');
  console.log('🌐 زيارة: http://localhost:' + PORT);
});
