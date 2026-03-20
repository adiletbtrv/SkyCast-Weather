import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import {
    getWeatherByCity,
    getForecastByCity,
    getWeatherByCoords,
    getForecastByCoords,
} from '../services/weatherService';
import type { WeatherData, ForecastData, TempUnit } from '../types';

interface WeatherState {
    weather: WeatherData | null;
    forecast: ForecastData | null;
    loading: boolean;
    error: string | null;
}

interface UseWeatherReturn extends WeatherState {
    searchByCity: (city: string) => void;
    searchByCoords: (lat: number, lon: number) => void;
    unit: TempUnit;
    toggleUnit: () => void;
    clearError: () => void;
}

export function useWeather(defaultCity = 'New York'): UseWeatherReturn {
    const [state, setState] = useState<WeatherState>({
        weather: null,
        forecast: null,
        loading: false,
        error: null,
    });
    const [unit, setUnit] = useState<TempUnit>('metric');

    const cancelRef = useRef<ReturnType<typeof axios.CancelToken.source> | null>(null);

    const fetchPair = useCallback(
        async (
            fetchW: (token: ReturnType<typeof axios.CancelToken.source>) => Promise<WeatherData>,
            fetchF: (token: ReturnType<typeof axios.CancelToken.source>) => Promise<ForecastData>,
        ) => {
            cancelRef.current?.cancel('superseded');
            const source = axios.CancelToken.source();
            cancelRef.current = source;

            setState(s => ({ ...s, loading: true, error: null }));

            try {
                const [weather, forecast] = await Promise.all([
                    fetchW(source),
                    fetchF(source),
                ]);
                setState({ weather, forecast, loading: false, error: null });
            } catch (err) {
                if (axios.isCancel(err)) return;
                setState(s => ({
                    ...s,
                    loading: false,
                    error: err instanceof Error ? err.message : 'Unknown error',
                }));
            }
        },
        [],
    );

    const lastQueryRef = useRef<
        | { type: 'city'; city: string }
        | { type: 'coords'; lat: number; lon: number }
        | null
    >(null);

    const searchByCity = useCallback(
        (city: string) => {
            lastQueryRef.current = { type: 'city', city };
            fetchPair(
                src => getWeatherByCity(city, unit, src.token),
                src => getForecastByCity(city, unit, src.token),
            );
        },
        [fetchPair, unit],
    );

    const searchByCoords = useCallback(
        (lat: number, lon: number) => {
            lastQueryRef.current = { type: 'coords', lat, lon };
            fetchPair(
                src => getWeatherByCoords(lat, lon, unit, src.token),
                src => getForecastByCoords(lat, lon, unit, src.token),
            );
        },
        [fetchPair, unit],
    );

    const toggleUnit = useCallback(() => {
        setUnit(u => {
            const next = u === 'metric' ? 'imperial' : 'metric';
            const q = lastQueryRef.current;
            if (q) {
                if (q.type === 'city') {
                    fetchPair(
                        src => getWeatherByCity(q.city, next, src.token),
                        src => getForecastByCity(q.city, next, src.token),
                    );
                } else {
                    fetchPair(
                        src => getWeatherByCoords(q.lat, q.lon, next, src.token),
                        src => getForecastByCoords(q.lat, q.lon, next, src.token),
                    );
                }
            }
            return next;
        });
    }, [fetchPair]);

    const clearError = useCallback(() => {
        setState(s => ({ ...s, error: null }));
    }, []);

    return { ...state, searchByCity, searchByCoords, unit, toggleUnit, clearError };
}