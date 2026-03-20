import React, { memo, useMemo } from 'react';
import { Wind, Droplets, Eye, Gauge, Sunrise, Sunset } from 'lucide-react';
import type { WeatherData, TempUnit } from '../types';

interface Props { data: WeatherData; unit: TempUnit; }

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit', minute: '2-digit', hour12: true,
});

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  desc?: string;
  iconClass: string;
}

const StatCard = memo(function StatCard({ icon: Icon, title, value, desc, iconClass }: StatCardProps) {
  return (
    <div className="
      bg-black/15 backdrop-blur-md border border-white/8
      rounded-2xl p-4
      flex flex-col justify-between
      hover:bg-black/25 hover:border-white/15
      transition-all duration-200 group
    ">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-xl bg-white/8 group-hover:bg-white/12 transition-colors">
          <Icon className={`w-4 h-4 ${iconClass}`} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/35">{title}</span>
      </div>
      <div>
        <p className="text-xl font-bold text-white tracking-tight">{value}</p>
        {desc && <p className="text-xs text-white/40 mt-1 font-medium">{desc}</p>}
      </div>
    </div>
  );
});

const Highlights = memo(function Highlights({ data, unit }: Props) {
  const sunrise = useMemo(() => timeFormatter.format(new Date(data.sys.sunrise * 1000)), [data.sys.sunrise]);
  const sunset = useMemo(() => timeFormatter.format(new Date(data.sys.sunset * 1000)), [data.sys.sunset]);

  const windLabel = unit === 'metric' ? 'km/h' : 'mph';
  const windSpeed = unit === 'metric'
    ? Math.round(data.wind.speed)
    : Math.round(data.wind.speed * 2.237);

  const visKm = (data.visibility / 1000).toFixed(1);
  const visLabel = data.visibility >= 10000 ? 'Excellent' : data.visibility >= 5000 ? 'Moderate' : 'Poor';

  return (
    <div className="
      bg-black/20 backdrop-blur-2xl border border-white/10
      rounded-3xl p-6 text-white shadow-xl h-full flex flex-col
    ">
      <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-5">Today's Highlights</h3>

      <div className="grid grid-cols-2 gap-3 flex-1">
        <div className="col-span-2 bg-black/15 border border-white/8 rounded-2xl p-5 flex justify-around items-center hover:bg-black/25 hover:border-white/15 transition-all duration-200">
          {[
            { Icon: Sunrise, label: 'Sunrise', val: sunrise, cls: 'text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]' },
            { Icon: Sunset, label: 'Sunset', val: sunset, cls: 'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]' },
          ].map(({ Icon, label, val, cls }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon className={`w-7 h-7 ${cls}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/35">{label}</span>
              <span className="font-bold text-lg">{val}</span>
            </div>
          ))}
        </div>

        <StatCard icon={Wind} title="Wind" value={`${windSpeed} ${windLabel}`} desc={`Direction ${data.wind.deg}°`} iconClass="text-cyan-300" />
        <StatCard icon={Droplets} title="Humidity" value={`${data.main.humidity}%`} desc={data.main.humidity > 70 ? 'High humidity' : 'Comfortable'} iconClass="text-blue-300" />
        <StatCard icon={Eye} title="Visibility" value={`${visKm} km`} desc={visLabel} iconClass="text-teal-300" />
        <StatCard icon={Gauge} title="Pressure" value={`${data.main.pressure} hPa`} desc={data.main.pressure < 1013 ? 'Below normal' : 'Above normal'} iconClass="text-purple-300" />
      </div>
    </div>
  );
});

export default Highlights;