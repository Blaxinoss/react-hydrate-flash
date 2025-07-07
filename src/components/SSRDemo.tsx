
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServerRenderer from './ServerRenderer';
import ClientHydrator from './ClientHydrator';
import { Separator } from '@/components/ui/separator';

const SSRDemo = () => {
  const [currentStep, setCurrentStep] = useState<'server' | 'hydration' | 'interactive'>('server');
  const [serverHTML, setServerHTML] = useState<string>('');

  const steps = [
    { id: 'server', label: 'Server Rendering', description: 'ReactDOMServer.renderToString()' },
    { id: 'hydration', label: 'Client Hydration', description: 'ReactDOM.hydrateRoot()' },
    { id: 'interactive', label: 'Interactive App', description: 'Fully hydrated React app' }
  ];

  const handleServerRender = (html: string) => {
    setServerHTML(html);
    setCurrentStep('hydration');
  };

  const handleHydrationComplete = () => {
    setCurrentStep('interactive');
  };

  const resetDemo = () => {
    setCurrentStep('server');
    setServerHTML('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Step Indicator */}
      <Card>
        <CardHeader>
          <CardTitle>SSR Process Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                  ${currentStep === step.id || (index === 0 && currentStep !== 'server') || 
                    (index === 1 && currentStep === 'interactive') ? 
                    'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}
                `}>
                  {index + 1}
                </div>
                <div className="ml-3 text-left">
                  <div className="font-medium">{step.label}</div>
                  <div className="text-sm text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-20 h-px bg-gray-300 mx-4" />
                )}
              </div>
            ))}
          </div>
          <Button onClick={resetDemo} variant="outline" className="w-full">
            Reset Demo
          </Button>
        </CardContent>
      </Card>

      <Tabs value={currentStep} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="server">Server Rendering</TabsTrigger>
          <TabsTrigger value="hydration" disabled={!serverHTML}>Client Hydration</TabsTrigger>
          <TabsTrigger value="interactive" disabled={currentStep !== 'interactive'}>Interactive App</TabsTrigger>
        </TabsList>

        <TabsContent value="server" className="space-y-4">
          <ServerRenderer onRender={handleServerRender} />
        </TabsContent>

        <TabsContent value="hydration" className="space-y-4">
          <ClientHydrator 
            serverHTML={serverHTML} 
            onHydrationComplete={handleHydrationComplete} 
          />
        </TabsContent>

        <TabsContent value="interactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🎉 Fully Interactive React Application</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                The application is now fully hydrated and interactive! All React features like 
                state management, event handlers, and lifecycle methods are working.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Hydration Complete ✅</h4>
                <ul className="text-green-700 space-y-1">
                  <li>• Server-rendered HTML is preserved</li>
                  <li>• React event handlers are attached</li>
                  <li>• Component state is initialized</li>
                  <li>• Virtual DOM is synced with real DOM</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SSRDemo;
