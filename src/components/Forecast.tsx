import React, { memo, useMemo } from 'react';
import WeatherIcon from './WeatherIcon';
import type { ForecastData, TempUnit } from '../types';

interface Props { data: ForecastData; unit: TempUnit; }

const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
const shortDayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

const Forecast = memo(function Forecast({ data, unit }: Props) {
  const deg = unit === 'metric' ? '°' : '°';
  const daily = useMemo(() =>
    data.list
      .filter(item => item.dt_txt.includes('12:00:00'))
      .slice(0, 5),
    [data.list],
  );

  return (
    <div className="
      bg-black/20 backdrop-blur-2xl border border-white/10
      rounded-3xl p-6 text-white shadow-xl
    ">
      <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-5">5-Day Forecast</h3>

      <div className="flex flex-col gap-1">
        {daily.map((day, i) => {
          const date = new Date(day.dt * 1000);
          const label = i === 0 ? 'Today' : dayFormatter.format(date);
          const short = i === 0 ? 'Today' : shortDayFormatter.format(date);

          return (
            <div
              key={day.dt}
              className="
                flex items-center justify-between
                px-4 py-3.5 rounded-2xl
                hover:bg-white/6
                transition-colors duration-150
                group cursor-default
              "
            >
              {/* Day label */}
              <span className="w-20 sm:w-28 text-sm font-semibold text-white/80 truncate">
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{short}</span>
              </span>

              {/* Icon + condition */}
              <div className="flex items-center gap-3 flex-1 justify-center">
                <WeatherIcon
                  main={day.weather[0].main}
                  className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                />
                <span className="text-xs text-white/40 capitalize hidden md:block font-medium w-20 truncate">
                  {day.weather[0].main}
                </span>
              </div>

              {/* Temps */}
              <div className="flex items-center gap-3 w-20 justify-end">
                <span className="font-bold text-base">{Math.round(day.main.temp_max)}{deg}</span>
                <span className="text-white/35 text-base">{Math.round(day.main.temp_min)}{deg}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Forecast;