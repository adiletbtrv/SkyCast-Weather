import axios, { AxiosError, CancelToken } from 'axios';
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_BASE_URL } from '../constants';
import type { WeatherData, ForecastData, TempUnit } from '../types';

const apiClient = axios.create({ baseURL: OPEN_WEATHER_BASE_URL });

function commonParams(unit: TempUnit) {
  return { appid: OPEN_WEATHER_API_KEY, units: unit };
}

function handleError(err: unknown): never {
  if (axios.isCancel(err)) throw err;
  const axiosErr = err as AxiosError<{ message?: string; cod?: string | number }>;
  const status = axiosErr.response?.status;
  if (status === 401) throw new Error('Invalid API key — check your configuration.');
  if (status === 404) throw new Error('City not found. Try a different name.');
  if (status === 429) throw new Error('Too many requests. Please wait a moment.');
  throw new Error(axiosErr.response?.data?.message ?? 'Network error — check your connection.');
}

export async function getWeatherByCity(
  city: string,
  unit: TempUnit = 'metric',
  cancelToken?: CancelToken,
): Promise<WeatherData> {
  try {
    const { data } = await apiClient.get<WeatherData>('/weather', {
      params: { ...commonParams(unit), q: city },
      cancelToken,
    });
    return data;
  } catch (e) { return handleError(e); }
}

export async function getForecastByCity(
  city: string,
  unit: TempUnit = 'metric',
  cancelToken?: CancelToken,
): Promise<ForecastData> {
  try {
    const { data } = await apiClient.get<ForecastData>('/forecast', {
      params: { ...commonParams(unit), q: city },
      cancelToken,
    });
    return data;
  } catch (e) { return handleError(e); }
}

export async function getWeatherByCoords(
  lat: number,
  lon: number,
  unit: TempUnit = 'metric',
  cancelToken?: CancelToken,
): Promise<WeatherData> {
  try {
    const { data } = await apiClient.get<WeatherData>('/weather', {
      params: { ...commonParams(unit), lat, lon },
      cancelToken,
    });
    return data;
  } catch (e) { return handleError(e); }
}

export async function getForecastByCoords(
  lat: number,
  lon: number,
  unit: TempUnit = 'metric',
  cancelToken?: CancelToken,
): Promise<ForecastData> {
  try {
    const { data } = await apiClient.get<ForecastData>('/forecast', {
      params: { ...commonParams(unit), lat, lon },
      cancelToken,
    });
    return data;
  } catch (e) { return handleError(e); }
}