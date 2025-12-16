import React, { useState } from 'react';
import { Search, Navigation } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocation: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocation }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-3">
      <div className="relative flex-1 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-white transition-colors" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a city..."
          className="w-full bg-black/20 backdrop-blur-xl border border-white/10 text-white placeholder-white/50 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:bg-black/30 focus:border-white/30 transition-all shadow-lg font-medium"
        />
      </div>
      <button
        type="button"
        onClick={onLocation}
        className="bg-black/20 backdrop-blur-xl border border-white/10 text-white p-3.5 rounded-2xl hover:bg-black/30 active:scale-95 transition-all shadow-lg group"
        title="Use my location"
      >
        <Navigation className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
      </button>
    </form>
  );
};

export default SearchBar;