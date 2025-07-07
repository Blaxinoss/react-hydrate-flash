
import React from 'react';
import SSRDemo from '../components/SSRDemo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            React Manual SSR Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This application demonstrates manual Server-Side Rendering where React content 
            is pre-rendered using ReactDOMServer.renderToString() and then hydrated on the client.
          </p>
        </div>
        <SSRDemo />
      </div>
    </div>
  );
};

export default Index;
