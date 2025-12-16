import React from 'react';
import { ForecastData } from '../types';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  data: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  // Filter list to get one reading per day (approx noon)
  const dailyForecast = data.list.filter((item) => item.dt_txt.includes('12:00:00')).slice(0, 5);

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white shadow-xl h-full overflow-hidden">
      <h3 className="text-white/80 font-semibold mb-6 text-lg tracking-wide">5-Day Forecast</h3>
      <div className="flex flex-col gap-1">
        {dailyForecast.map((day) => {
          const date = new Date(day.dt * 1000);
          return (
            <div key={day.dt} className="flex items-center justify-between p-4 rounded-2xl hover:bg-black/20 transition-colors group cursor-default">
              <span className="w-24 font-medium text-white/90 text-lg">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              
              <div className="flex items-center gap-3">
                <WeatherIcon main={day.weather[0].main} className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm text-white/50 w-24 hidden sm:block capitalize font-medium">{day.weather[0].main}</span>
              </div>
              
              <div className="flex gap-4 w-24 justify-end">
                <span className="font-bold text-lg">{Math.round(day.main.temp_max)}°</span>
                <span className="text-white/40 text-lg font-medium">{Math.round(day.main.temp_min)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;