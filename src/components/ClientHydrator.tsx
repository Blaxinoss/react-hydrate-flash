
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';
import SharedComponent from './SharedComponent';

interface ClientHydratorProps {
  serverHTML: string;
  onHydrationComplete: () => void;
}

const ClientHydrator: React.FC<ClientHydratorProps> = ({ 
  serverHTML, 
  onHydrationComplete 
}) => {
  const [isHydrating, setIsHydrating] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hydrationSteps, setHydrationSteps] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addHydrationStep = (step: string) => {
    setHydrationSteps(prev => [...prev, step]);
  };

  const handleHydration = async () => {
    setIsHydrating(true);
    setHydrationSteps([]);

    // Step 1: Parse server HTML
    addHydrationStep('📄 Parsing server-rendered HTML...');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 2: Insert static HTML
    if (containerRef.current) {
      containerRef.current.innerHTML = serverHTML;
    }
    addHydrationStep('🔗 Injecting static HTML into DOM...');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 3: React Virtual DOM creation
    addHydrationStep('⚛️ Creating React Virtual DOM...');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 4: Hydration process
    addHydrationStep('💧 Hydrating components...');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 5: Event listeners
    addHydrationStep('🎯 Attaching event listeners...');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 6: Complete
    addHydrationStep('✅ Hydration complete!');
    
    setIsHydrating(false);
    setIsHydrated(true);
    onHydrationComplete();
  };

  useEffect(() => {
    if (isHydrated && containerRef.current) {
      // Actually render the React component after "hydration"
      const reactElement = React.createElement(SharedComponent);
      // In a real app, this would be ReactDOM.hydrateRoot()
      containerRef.current.innerHTML = '';
      // Simulate the hydrated component
      setTimeout(() => {
        if (containerRef.current) {
          const div = document.createElement('div');
          div.innerHTML = serverHTML;
          // Add event listeners to make it "interactive"
          const buttons = div.querySelectorAll('button');
          buttons.forEach(button => {
            button.addEventListener('click', () => {
              alert('Hydrated button clicked! React is now interactive.');
            });
          });
          containerRef.current.appendChild(div);
        }
      }, 100);
    }
  }, [isHydrated, serverHTML]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Client-Side Hydration
            <Badge variant="secondary">ReactDOM.hydrateRoot()</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">What happens during hydration:</h4>
            <ul className="text-purple-700 space-y-1">
              <li>• React takes over the server-rendered HTML</li>
              <li>• Virtual DOM is created and matched with real DOM</li>
              <li>• Event handlers and state are initialized</li>
              <li>• App becomes fully interactive</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Server HTML to Hydrate:</h4>
            <div className="bg-gray-100 border rounded-lg p-3 text-sm font-mono overflow-x-auto">
              <pre className="text-xs">{serverHTML}</pre>
            </div>
          </div>

          <Button 
            onClick={handleHydration} 
            disabled={isHydrating || isHydrated}
            className="w-full"
          >
            {isHydrating ? 'Hydrating...' : isHydrated ? 'Hydration Complete' : 'Start Hydration'}
          </Button>

          {hydrationSteps.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Hydration Process:</h4>
              <div className="bg-gray-50 border rounded-lg p-3 space-y-1">
                {hydrationSteps.map((step, index) => (
                  <div key={index} className="text-sm flex items-center gap-2">
                    <span className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                      {index + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(serverHTML || isHydrated) && (
            <div className="space-y-3">
              <h4 className="font-semibold">
                {isHydrated ? 'Hydrated Component (Interactive):' : 'Static HTML Preview:'}
              </h4>
              <div 
                ref={containerRef}
                className="border rounded-lg p-4 bg-white min-h-[100px]"
              />
              {!isHydrated && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-orange-800 text-sm">
                    ⚠️ This is still static HTML - React hasn't taken over yet!
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientHydrator;
