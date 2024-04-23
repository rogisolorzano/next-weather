import { useMemo } from "react";
import { WeatherApi } from "./weather-api.interface";
import { OpenWeatherApiClientFactory } from "./open-weather/factory";

export function useWeatherApi(): WeatherApi {
  const api = useMemo(() => OpenWeatherApiClientFactory.create(), []);
  return api;
}
