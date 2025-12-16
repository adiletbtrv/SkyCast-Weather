import React from 'react';
import { WeatherData } from '../types';
import { Wind, Droplets, Eye, Gauge, Sunrise, Sunset } from 'lucide-react';

interface HighlightsProps {
  data: WeatherData;
}

const Highlights: React.FC<HighlightsProps> = ({ data }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const Card = ({ icon: Icon, title, value, desc, iconColor }: any) => (
    <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:bg-black/30 transition-colors group">
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors`}>
           <Icon className={`w-5 h-5 ${iconColor || 'text-white'}`} />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-white/40">{title}</span>
      </div>
      <div>
        <p className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">{value}</p>
        {desc && <p className="text-xs text-white/50 mt-1 font-medium">{desc}</p>}
      </div>
    </div>
  );

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white shadow-xl h-full flex flex-col">
      <h3 className="text-white/80 font-semibold mb-6 text-lg tracking-wide">Today's Highlights</h3>
      
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="col-span-2 bg-black/20 border border-white/5 rounded-2xl p-5 flex justify-between items-center hover:bg-black/30 transition-colors">
            <div className="flex flex-col items-center flex-1 border-r border-white/5">
                <Sunrise className="w-8 h-8 text-yellow-400 mb-2 drop-shadow-lg" />
                <p className="text-xs text-white/40 uppercase font-bold tracking-widest mb-1">Sunrise</p>
                <p className="font-bold text-xl">{formatTime(data.sys.sunrise)}</p>
            </div>
            <div className="flex flex-col items-center flex-1">
                <Sunset className="w-8 h-8 text-orange-500 mb-2 drop-shadow-lg" />
                <p className="text-xs text-white/40 uppercase font-bold tracking-widest mb-1">Sunset</p>
                <p className="font-bold text-xl">{formatTime(data.sys.sunset)}</p>
            </div>
        </div>

        <Card 
          icon={Wind} 
          title="Wind Status" 
          value={`${Math.round(data.wind.speed)} km/h`}
          desc={`Direction: ${data.wind.deg}°`}
          iconColor="text-cyan-400"
        />
        <Card 
          icon={Droplets} 
          title="Humidity" 
          value={`${data.main.humidity}%`}
          desc="Dew point is 21°"
          iconColor="text-blue-400"
        />
        <Card 
          icon={Eye} 
          title="Visibility" 
          value={`${(data.visibility / 1000).toFixed(1)} km`}
          desc={data.visibility >= 10000 ? "Excellent" : "Low visibility"}
          iconColor="text-teal-400"
        />
        <Card 
          icon={Gauge} 
          title="Pressure" 
          value={`${data.main.pressure} hPa`}
          desc={data.main.pressure < 1013 ? "Low" : "High"}
          iconColor="text-purple-400"
        />
      </div>
    </div>
  );
};

export default Highlights;