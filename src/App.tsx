import React, { useEffect, useCallback, useMemo, memo } from 'react';
import { useWeather } from './hooks/useWeather';
import { DEFAULT_CITY } from './constants';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Highlights from './components/Highlights';
import Forecast from './components/Forecast';
import Skeleton from './components/Skeleton';
import ErrorMessage from './components/ErrorMessage';

const BG_MAP: Record<string, string> = {
  Clear: 'from-amber-500 via-orange-400 to-rose-500',
  Clouds: 'from-slate-700 via-slate-500 to-slate-400',
  Rain: 'from-blue-950 via-blue-800 to-slate-700',
  Thunderstorm: 'from-indigo-950 via-violet-900 to-slate-900',
  Snow: 'from-sky-200  via-blue-200  to-slate-200',
  Mist: 'from-stone-600 via-stone-500 to-stone-400',
  Drizzle: 'from-blue-800 via-blue-600  to-cyan-700',
};
const DEFAULT_BG = 'from-sky-600 via-cyan-500 to-blue-500';

const App = memo(function App() {
  const {
    weather, forecast,
    loading, error,
    searchByCity, searchByCoords,
    unit, toggleUnit,
    clearError,
  } = useWeather();

  useEffect(() => { searchByCity(DEFAULT_CITY); }, []);

  const handleLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => searchByCoords(coords.latitude, coords.longitude),
      () => { },
    );
  }, [searchByCoords]);

  const bg = useMemo(
    () => BG_MAP[weather?.weather[0]?.main ?? ''] ?? DEFAULT_BG,
    [weather?.weather],
  );

  const showContent = Boolean(weather && forecast && !loading);

  return (
    <div
      className={`
        min-h-screen w-full
        bg-gradient-to-br ${bg}
        transition-[background] duration-1000 ease-in-out
        p-4 md:p-8
        flex items-start justify-center
        selection:bg-white/20
      `}
    >
      <div className="max-w-6xl w-full mx-auto space-y-6">

        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">SkyCast</h1>
            {weather && (
              <p className="text-white/50 text-sm font-medium mt-0.5">
                {weather.name}, {weather.sys.country}
              </p>
            )}
          </div>
          <div className="w-full sm:w-auto sm:min-w-[360px]">
            <SearchBar
              onSearch={searchByCity}
              onLocation={handleLocation}
              unit={unit}
              onToggleUnit={toggleUnit}
            />
          </div>
        </header>

        {/* Error */}
        {error && <ErrorMessage message={error} onDismiss={clearError} />}

        {/* Skeleton while loading */}
        {loading && <Skeleton />}

        {/* Content */}
        {showContent && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Current weather */}
            <div className="lg:col-span-1">
              <CurrentWeather data={weather!} unit={unit} />
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Highlights data={weather!} unit={unit} />
              <Forecast data={forecast!} unit={unit} />
            </div>
          </div>
        )}

        {/* Empty state */}
        {!weather && !loading && !error && (
          <div className="h-60 flex items-center justify-center text-white/50 text-sm font-medium">
            Search for a city or use your location to get started.
          </div>
        )}

      </div>
    </div>
  );
});

export default App;