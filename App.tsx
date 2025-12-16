import React, { useState, useEffect } from 'react';
import { getWeatherByCity, getForecastByCity, getWeatherByCoords, getForecastByCoords } from './services/weatherService';
import { WeatherData, ForecastData } from './types';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Highlights from './components/Highlights';
import Forecast from './components/Forecast';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { OPEN_WEATHER_API_KEY } from './constants';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (OPEN_WEATHER_API_KEY && OPEN_WEATHER_API_KEY !== "YOUR_OPEN_WEATHER_API_KEY_HERE") {
      handleSearch('New York');
    }
  }, []);

  const fetchAllData = async (fetchWeather: () => Promise<WeatherData>, fetchForecast: () => Promise<ForecastData>) => {
    if (OPEN_WEATHER_API_KEY === "YOUR_OPEN_WEATHER_API_KEY_HERE") {
      setError("API Key Required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [wData, fData] = await Promise.all([fetchWeather(), fetchForecast()]);
      setWeather(wData);
      setForecast(fData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city: string) => {
    fetchAllData(
      () => getWeatherByCity(city),
      () => getForecastByCity(city)
    );
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAllData(
            () => getWeatherByCoords(latitude, longitude),
            () => getForecastByCoords(latitude, longitude)
          );
        },
        () => {
          setError("Location permission denied");
          setLoading(false);
        }
      );
    }
  };

  const getBackground = (code?: string) => {
    switch (code) {
      case 'Clear': return 'from-orange-400 via-amber-400 to-rose-500';
      case 'Clouds': return 'from-slate-600 via-slate-500 to-slate-400';
      case 'Rain': return 'from-blue-900 via-blue-800 to-slate-800';
      case 'Thunderstorm': return 'from-indigo-900 via-purple-900 to-slate-900';
      case 'Snow': return 'from-blue-200 via-blue-300 to-slate-300';
      case 'Mist': return 'from-stone-500 via-stone-400 to-stone-300';
      default: return 'from-blue-500 via-cyan-400 to-blue-400';
    }
  };

  const bgGradient = getBackground(weather?.weather[0]?.main);

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${bgGradient} transition-all duration-1000 p-4 md:p-8 flex items-center justify-center selection:bg-white/30`}>
      <div className="max-w-6xl w-full mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-white drop-shadow-md">
                <h1 className="text-3xl font-bold tracking-tight">SkyCast</h1>
            </div>
            <div className="w-full md:w-96">
                <SearchBar onSearch={handleSearch} onLocation={handleLocation} />
            </div>
        </header>

        {loading && <div className="h-[600px] flex items-center justify-center"><Loader /></div>}
        
        {error && <ErrorMessage message={error} />}

        {weather && forecast && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Main Current Weather */}
            <div className="lg:col-span-1 h-full">
               <CurrentWeather data={weather} />
            </div>

            {/* Content Right */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="md:col-span-2">
                 <Highlights data={weather} />
               </div>
               <div className="md:col-span-2">
                 <Forecast data={forecast} />
               </div>
            </div>
          </div>
        )}

        {!weather && !loading && !error && (
            <div className="h-[60vh] flex flex-col items-center justify-center text-white/70">
                <p className="text-xl font-medium drop-shadow-sm">Start by searching for a city or using your location.</p>
            </div>
        )}
      </div>
    </div>
  );
}

export default App;