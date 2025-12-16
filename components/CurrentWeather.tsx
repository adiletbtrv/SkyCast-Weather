import React from 'react';
import { WeatherData } from '../types';
import { MapPin, CalendarDays } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const { name, sys, main, weather, dt } = data;
  const date = new Date(dt * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white shadow-2xl flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Dynamic Glow based on weather could be cool, but keeping it subtle white/transparent for now */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-6 h-6 text-white drop-shadow-sm" />
          <h2 className="text-2xl font-semibold tracking-wide drop-shadow-sm truncate">{name}, {sys.country}</h2>
        </div>
        <div className="flex items-center gap-2 text-white/60 font-medium pl-1">
          <CalendarDays className="w-4 h-4" />
          <span>{date}</span>
        </div>
      </div>

      <div className="flex flex-col items-center py-8 relative z-10">
        <div className="mb-4 animate-pulse-slow drop-shadow-2xl">
            <WeatherIcon main={weather[0].main} className="w-40 h-40" />
        </div>
        
        <h1 className="text-8xl font-bold tracking-tighter text-white drop-shadow-xl">
          {Math.round(main.temp)}°
        </h1>
        <p className="text-2xl font-medium capitalize mt-2 text-white/90 drop-shadow-md">{weather[0].description}</p>
        
        <div className="w-full h-px bg-white/10 my-8"></div>

        <div className="flex gap-12 text-sm font-semibold text-white/90">
            <div className="flex flex-col items-center gap-1">
                <span className="text-white/50 text-xs uppercase tracking-widest font-bold">High</span>
                <span className="text-2xl">{Math.round(main.temp_max)}°</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-white/50 text-xs uppercase tracking-widest font-bold">Low</span>
                <span className="text-2xl">{Math.round(main.temp_min)}°</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;