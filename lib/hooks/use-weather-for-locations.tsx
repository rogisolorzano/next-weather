"use client";
import { useEffect, useRef, useState } from "react";
import { Location } from "../store/location/types";
import { WeatherInfo } from "../types";
import { useWeatherApi } from "../client/use-weather-api";
import { useLocationStore } from "../store/location/location";
import chunk from "lodash.chunk";
import { getTime } from "../utils/get-time";

export enum LocationWeatherStatus {
  LOADING = "LOADING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export type LocationWeatherState = {
  status: LocationWeatherStatus;
  weatherInfos: WeatherInfo[];
};

type WeatherCacheItem = {
  cachedAt: string;
  item: WeatherInfo;
};

/**
 * Handles fetching weather data from the API for locations selected by the user.
 * Uses a short lived cache to minimize calls to the API.
 */
export function useWeatherForLocations(): LocationWeatherState {
  const cacheRef = useRef<Record<string, WeatherCacheItem>>({});
  const cacheHydrated = useRef<boolean>(false);
  const { locations } = useLocationStore();
  const [state, setState] = useState<LocationWeatherState>({
    status: LocationWeatherStatus.LOADING,
    weatherInfos: [],
  });
  const client = useWeatherApi();

  const hydrateWeatherCache = () => {
    try {
      const cache = localStorage.getItem("weather-cache");
      if (!cache) {
        return;
      }
      cacheRef.current = JSON.parse(cache);
      cacheHydrated.current = true;
    } catch (e) {
      // Capture trace
    }
  };

  const storeWeatherCache = () => {
    try {
      localStorage.setItem("weather-cache", JSON.stringify(cacheRef.current));
    } catch (e) {
      // Capture trace
    }
  };

  const getWeatherInfo = async (location: Location): Promise<WeatherInfo> => {
    const cachedItem = cacheRef.current[location.name];
    if (cachedItem) {
      const expiry = new Date(cachedItem.cachedAt);
      const now = new Date();
      const ageInSeconds = Math.abs(now.getTime() - expiry.getTime()) / 1000;
      const isExpired = ageInSeconds > 30;
      if (isExpired) {
        delete cacheRef.current[location.name];
      } else {
        return cachedItem.item;
      }
    }
    const response = await client.getWeather({
      lat: location.lat,
      lon: location.lon,
    });
    const info: WeatherInfo = {
      name: location.name,
      currentTime: getTime(response.timezoneOffset),
      iconUrl: response.iconUrl,
      weatherSummary: response.description,
      current: response.currentTemp,
      high: response.highTemp,
      low: response.lowTemp,
    };
    cacheRef.current[location.name] = {
      cachedAt: new Date().toISOString(),
      item: info,
    };
    return info;
  };

  const fetchWeatherForLocations = async (locations: Location[]) => {
    try {
      if (!cacheHydrated.current) {
        hydrateWeatherCache();
      }
      const chunks = chunk(locations, 3);
      const allWeatherInfos = [];
      for (const locationChunk of chunks) {
        const weatherPromises = locationChunk.map(getWeatherInfo);
        const weathers = await Promise.all(weatherPromises);
        allWeatherInfos.push(...weathers);
      }
      storeWeatherCache();
      setState({
        status: LocationWeatherStatus.SUCCESS,
        weatherInfos: allWeatherInfos,
      });
    } catch (e) {
      setState({
        status: LocationWeatherStatus.ERROR,
        weatherInfos: [],
      });
    }
  };

  useEffect(() => {
    fetchWeatherForLocations(locations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  return state;
}
