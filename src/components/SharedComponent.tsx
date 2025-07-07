
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Star, ThumbsUp } from 'lucide-react';

const SharedComponent: React.FC = () => {
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [stars, setStars] = useState(128);
  const [isStarred, setIsStarred] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleStar = () => {
    if (isStarred) {
      setStars(prev => prev - 1);
    } else {
      setStars(prev => prev + 1);
    }
    setIsStarred(!isStarred);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ThumbsUp className="w-5 h-5 text-blue-500" />
          Interactive Post Component
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-gray-600">
          This component demonstrates SSR and hydration. It renders the same way on 
          the server and client, but only becomes interactive after hydration.
        </div>
        
        <div className="flex gap-3">
          <Button
            variant={isLiked ? "default" : "outline"}
            size="sm"
            onClick={handleLike}
            className="flex items-center gap-2"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            {likes}
          </Button>
          
          <Button
            variant={isStarred ? "default" : "outline"}
            size="sm"
            onClick={handleStar}
            className="flex items-center gap-2"
          >
            <Star className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
            {stars}
          </Button>
        </div>

        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          Current timestamp: {new Date().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default SharedComponent;
