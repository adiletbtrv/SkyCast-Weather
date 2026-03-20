import React, { memo, useMemo } from 'react';
import { MapPin, CalendarDays } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import type { WeatherData, TempUnit } from '../types';

interface Props { data: WeatherData; unit: TempUnit; }

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long', day: 'numeric', month: 'long',
});

const CurrentWeather = memo(function CurrentWeather({ data, unit }: Props) {
  const { name, sys, main, weather, dt } = data;
  const deg = unit === 'metric' ? '°C' : '°F';
  const date = useMemo(() => dateFormatter.format(new Date(dt * 1000)), [dt]);

  return (
    <div className="
      relative overflow-hidden
      bg-black/20 backdrop-blur-2xl
      border border-white/10
      rounded-3xl p-7
      text-white shadow-2xl
      flex flex-col justify-between h-full
      group
    ">
      {/* Ambient glow */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 group-hover:opacity-70" />
      <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-white/3 rounded-full blur-2xl pointer-events-none" />

      {/* Location + date */}
      <div className="relative z-10 space-y-1.5">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-white/60 flex-shrink-0" />
          <h2 className="text-lg font-semibold tracking-tight truncate">
            {name}, <span className="text-white/60 font-normal">{sys.country}</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-white/45 text-sm pl-0.5">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>{date}</span>
        </div>
      </div>

      {/* Icon + temperature */}
      <div className="relative z-10 flex flex-col items-center py-8 gap-2">
        <WeatherIcon main={weather[0].main} className="w-28 h-28" />
        <div className="text-center mt-2">
          <p className="text-8xl font-bold tracking-tighter leading-none">
            {Math.round(main.temp)}<span className="text-5xl font-light text-white/70">°</span>
          </p>
          <p className="text-lg capitalize text-white/75 font-medium mt-3">
            {weather[0].description}
          </p>
          <p className="text-sm text-white/40 mt-1">
            Feels like {Math.round(main.feels_like)}{deg}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 w-full h-px bg-white/8 mb-6" />

      {/* High / Low */}
      <div className="relative z-10 flex justify-center gap-10">
        {[
          { label: 'High', val: main.temp_max },
          { label: 'Low', val: main.temp_min },
        ].map(({ label, val }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/35">{label}</span>
            <span className="text-2xl font-semibold">{Math.round(val)}{deg}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default CurrentWeather;