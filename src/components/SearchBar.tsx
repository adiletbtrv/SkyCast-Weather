import React, { useRef, useCallback, memo } from 'react';
import { Search, LocateFixed, Thermometer } from 'lucide-react';
import type { TempUnit } from '../types';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocation: () => void;
  unit: TempUnit;
  onToggleUnit: () => void;
}

const SearchBar = memo(function SearchBar({
  onSearch, onLocation, unit, onToggleUnit,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const val = inputRef.current?.value.trim();
    if (val) {
      onSearch(val);
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [onSearch]);

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2.5">
      <div className="relative flex-1 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 group-focus-within:text-white/80 transition-colors duration-200 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city…"
          autoComplete="off"
          spellCheck={false}
          className="
            w-full h-11 bg-white/10 backdrop-blur-xl
            border border-white/15 hover:border-white/25
            focus:border-white/40 focus:bg-white/15
            text-white placeholder-white/35
            rounded-2xl pl-11 pr-4
            text-sm font-medium
            outline-none
            transition-all duration-200
            shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
          "
        />
      </div>

      {/* Location */}
      <button
        type="button"
        onClick={onLocation}
        title="Use my location"
        className="
          h-11 w-11 flex-shrink-0
          bg-white/10 backdrop-blur-xl border border-white/15
          hover:bg-white/20 hover:border-white/30
          active:scale-95
          text-white/60 hover:text-white
          rounded-2xl
          flex items-center justify-center
          transition-all duration-200
          shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
        "
      >
        <LocateFixed className="w-4 h-4" />
      </button>

      {/* Unit toggle */}
      <button
        type="button"
        onClick={onToggleUnit}
        title={`Switch to ${unit === 'metric' ? 'Fahrenheit' : 'Celsius'}`}
        className="
          h-11 px-3.5 flex-shrink-0
          bg-white/10 backdrop-blur-xl border border-white/15
          hover:bg-white/20 hover:border-white/30
          active:scale-95
          text-white/60 hover:text-white
          rounded-2xl
          flex items-center gap-1.5
          transition-all duration-200
          text-sm font-semibold
          shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
        "
      >
        <Thermometer className="w-3.5 h-3.5" />
        {unit === 'metric' ? '°C' : '°F'}
      </button>
    </form>
  );
});

export default SearchBar;