import React from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, CloudSnow, CloudDrizzle, CloudFog } from 'lucide-react';

interface WeatherIconProps {
  main: string;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ main, className = "w-10 h-10" }) => {
  switch (main) {
    case 'Clear': 
      return <Sun className={`${className} text-yellow-400`} />;
    case 'Clouds': 
      return <Cloud className={`${className} text-gray-300`} />;
    case 'Rain': 
      return <CloudRain className={`${className} text-blue-400`} />;
    case 'Thunderstorm': 
      return <CloudLightning className={`${className} text-purple-400`} />;
    case 'Snow': 
      return <CloudSnow className={`${className} text-cyan-200`} />;
    case 'Drizzle': 
      return <CloudDrizzle className={`${className} text-blue-300`} />;
    case 'Mist':
    case 'Fog':
    case 'Haze':
    case 'Smoke': 
    case 'Dust':
    case 'Sand':
    case 'Ash':
    case 'Squall':
    case 'Tornado':
      return <CloudFog className={`${className} text-slate-300`} />;
    default: 
      return <Sun className={`${className} text-yellow-400`} />;
  }
};

export default WeatherIcon;