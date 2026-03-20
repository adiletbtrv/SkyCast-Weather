import React, { memo } from 'react';
import {
  Cloud, Sun, CloudRain, CloudLightning,
  CloudSnow, CloudDrizzle, CloudFog,
} from 'lucide-react';

interface WeatherIconProps {
  main: string;
  className?: string;
}

const WeatherIcon = memo(function WeatherIcon({ main, className = 'w-10 h-10' }: WeatherIconProps) {
  switch (main) {
    case 'Clear': return <Sun className={`${className} text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]`} />;
    case 'Clouds': return <Cloud className={`${className} text-slate-200`} />;
    case 'Rain': return <CloudRain className={`${className} text-blue-300`} />;
    case 'Thunderstorm': return <CloudLightning className={`${className} text-violet-300`} />;
    case 'Snow': return <CloudSnow className={`${className} text-cyan-100`} />;
    case 'Drizzle': return <CloudDrizzle className={`${className} text-blue-200`} />;
    default: return <CloudFog className={`${className} text-slate-300`} />;
  }
});

export default WeatherIcon;