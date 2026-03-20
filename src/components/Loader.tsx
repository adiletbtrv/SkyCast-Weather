import React, { memo } from 'react';
import { Loader2 } from 'lucide-react';

const Loader = memo(function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8 animate-fade-in">
      <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
      <p className="text-white/50 text-sm font-medium">Scanning the skies…</p>
    </div>
  );
});

export default Loader;