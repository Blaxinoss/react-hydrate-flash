
import React from 'react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">السيرفر البسيط جاهز! 🎉</h1>
        <p className="text-lg mb-6">روح على المجلد server وشغل:</p>
        <div className="bg-black text-green-400 p-4 rounded font-mono">
          cd server<br />
          npm install<br />
          npm start
        </div>
        <p className="mt-4 text-sm text-gray-600">
          بعدين افتح: http://localhost:3001
        </p>
      </div>
    </div>
  );
};

export default Index;
