
# React SSR Server

هذا فايل السيرفر الحقيقي للـ Server-Side Rendering باستخدام React.

## كيفية تشغيل السيرفر:

1. انتقل إلى مجلد السيرفر:
```bash
cd server
```

2. قم بتثبيت المكتبات المطلوبة:
```bash
npm install
```

3. شغل السيرفر:
```bash
npm start
```

أو للتطوير مع التحديث التلقائي:
```bash
npm run dev
```

4. افتح المتصفح على: http://localhost:3001

## كيف يعمل SSR:

1. **Server-Side**: يتم تشغيل `ReactDOMServer.renderToString()` لتحويل مكونات React إلى HTML
2. **Client-Side**: يتم تحميل React في المتصفح ويقوم بـ hydration للـ HTML المُرسل من السيرفر
3. **Hydration**: React يربط الأحداث والتفاعلات مع الـ HTML الموجود

## المتطلبات:

- Node.js 16+
- Express.js
- React & ReactDOM

## الفرق بين Demo والسيرفر الحقيقي:

- **Demo**: يحاكي SSR في المتصفح فقط
- **Server**: يقوم بـ SSR حقيقي باستخدام Node.js و Express
