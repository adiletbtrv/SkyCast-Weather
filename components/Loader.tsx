import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 animate-fade-in">
      <Loader2 className="w-12 h-12 text-white animate-spin" />
      <p className="text-white text-lg font-medium opacity-90">Scanning the skies...</p>
    </div>
  );
};

export default Loader;
