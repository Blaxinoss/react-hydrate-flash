
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Globe, Zap } from 'lucide-react';

const SSRExplanation = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            فهم الـ Server-Side Rendering
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                هذا التطبيق (Demo)
              </h4>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• يحاكي SSR في المتصفح</li>
                <li>• للتوضيح والتعلم فقط</li>
                <li>• لا يحتاج سيرفر حقيقي</li>
                <li>• يستخدم React في الـ frontend فقط</li>
              </ul>
              <Badge variant="secondary" className="mt-2">Demo Only</Badge>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                السيرفر الحقيقي
              </h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Node.js + Express server</li>
                <li>• ReactDOMServer.renderToString()</li>
                <li>• SSR حقيقي للإنتاج</li>
                <li>• ملف server/index.js</li>
              </ul>
              <Badge variant="default" className="mt-2">Production Ready</Badge>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">📁 ملفات السيرفر المُضافة:</h4>
            <ul className="text-yellow-700 space-y-1 text-sm">
              <li>• <code>server/index.js</code> - الكود الرئيسي للسيرفر</li>
              <li>• <code>server/package.json</code> - مكتبات السيرفر</li>
              <li>• <code>server/README.md</code> - تعليمات التشغيل</li>
            </ul>
          </div>

          <div className="bg-gray-100 border rounded-lg p-4">
            <h4 className="font-semibold mb-2">🚀 لتشغيل السيرفر الحقيقي:</h4>
            <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`cd server
npm install
npm start

# ثم افتح: http://localhost:3001`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SSRExplanation;
