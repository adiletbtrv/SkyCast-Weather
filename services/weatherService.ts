import axios from 'axios';
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_BASE_URL } from '../constants';
import { WeatherData, ForecastData } from '../types';

const apiClient = axios.create({
  baseURL: OPEN_WEATHER_BASE_URL,
  params: {
    appid: OPEN_WEATHER_API_KEY,
    units: 'metric',
  },
});

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  const { data } = await apiClient.get<WeatherData>('/weather', {
    params: { q: city },
  });
  return data;
};

export const getForecastByCity = async (city: string): Promise<ForecastData> => {
  const { data } = await apiClient.get<ForecastData>('/forecast', {
    params: { q: city },
  });
  return data;
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const { data } = await apiClient.get<WeatherData>('/weather', {
    params: { lat, lon },
  });
  return data;
};

export const getForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  const { data } = await apiClient.get<ForecastData>('/forecast', {
    params: { lat, lon },
  });
  return data;
};
