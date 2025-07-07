
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code } from 'lucide-react';
import { simulateServerRender } from '../utils/ssrUtils';
import SharedComponent from './SharedComponent';

interface ServerRendererProps {
  onRender: (html: string) => void;
}

const ServerRenderer: React.FC<ServerRendererProps> = ({ onRender }) => {
  const [isRendering, setIsRendering] = useState(false);
  const [renderedHTML, setRenderedHTML] = useState<string>('');

  const handleServerRender = async () => {
    setIsRendering(true);
    
    // Simulate server-side rendering delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const html = simulateServerRender();
    setRenderedHTML(html);
    setIsRendering(false);
    onRender(html);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Server-Side Rendering
            <Badge variant="secondary">ReactDOMServer</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">What happens on the server:</h4>
            <ul className="text-blue-700 space-y-1">
              <li>• React components are rendered to static HTML</li>
              <li>• No JavaScript execution or event handlers</li>
              <li>• Fast initial page load and SEO benefits</li>
              <li>• Uses ReactDOMServer.renderToString()</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Component to Render:</h4>
            <div className="border rounded-lg p-4 bg-gray-50">
              <SharedComponent />
            </div>
          </div>

          <Button 
            onClick={handleServerRender} 
            disabled={isRendering}
            className="w-full"
          >
            {isRendering ? 'Rendering on Server...' : 'Simulate Server Render'}
          </Button>

          {renderedHTML && (
            <div className="space-y-3">
              <h4 className="font-semibold">Generated HTML (ReactDOMServer.renderToString):</h4>
              <div className="bg-gray-900 text-green-400 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <pre>{renderedHTML}</pre>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-sm">
                  ⚠️ This HTML is static - no JavaScript events are attached yet!
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerRenderer;
